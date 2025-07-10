import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Media } from 'src/app/interfaces/media';
import { Magnet, MovieMetaData, QueryMedia, Video } from 'src/app/interfaces/metadata';
import { FilminhoService } from 'src/app/services/filminho.service';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';
import { stringToHexColor } from 'src/app/utils';

function* infiniteCycle() {
  const values = ["tito", "jujuba", null];
  let i = 0;
  while (true) {
    yield values[i];
    i = (i + 1) % values.length;
  }
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private loadingController: LoadingController,
    private stateService: StateService,
    private alertController: AlertController
  ) {
    this.imdbID = this.route.snapshot.paramMap.get('id');
    this.type = (this.route.snapshot.queryParamMap.get('type') ?? "movie") as "movie" | "series";
    this.media.imdbID = this.imdbID;
    const navigation = this.router.getCurrentNavigation();
    this.fallbackMedia = navigation?.extras.state?.['fallback'];
  }
  magnetLoading = false;
  languages: string[] = [];
  selectedLanguages: string[] = [];
  magnets: Magnet[] = [];
  filter: Partial<Magnet> = {};
  segment = "about";
  ownership = infiniteCycle();
  activeIndex = -1;
  newRemark = 0;
  newReview: string = '';
  editable = true;
  dirty = false;
  loading = false;
  imdbID: string | null;
  type: "series" | "movie";
  token: string = '';
  fallbackMedia: QueryMedia;
  media: Partial<Media> = { Status: null, Remarks: {}, Reviews: {} };
  originalMedia: Partial<Media> = { Status: null, Remarks: {}, Reviews: {} };
  metadata?: MovieMetaData;
  get star() {
    return Math.floor(Number(this.newRemark) / 2);
  }
  get half() {
    return (((Number(this.newRemark) / 2) % 1) * 2);
  }

  deserialize(token: string) {
    return (JSON.parse(atob(token.split('.')[1])) as {token: string}).token.toLocaleLowerCase();
  }

  flattenObject(obj: Record<string, any>, prefix = ''): any {
    return Object.keys(obj).reduce((acc: any, k: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, this.flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  }

  editRemark(modal: IonModal) {
    if (!this.media.Remarks) this.media.Remarks = {};
    if (!this.media.Reviews) this.media.Reviews = {};
    if (!this.media.Remarks[this.token]) {
      this.media.Remarks = {[this.token]: 0};
    }
    if (!this.media.Reviews[this.token]) {
      this.media.Reviews = {[this.token]: ""};
    }
    if (this.media.Remarks && this.media.Remarks[this.token]) {
      this.newRemark = this.media.Remarks[this.token] * 2;
    }
    if (this.media.Reviews && this.media.Reviews[this.token]) {
      this.newReview = this.media.Reviews[this.token];
    }
    modal.present();
  }

  openMagnet(hash: string) {
    window.open('magnet:?xt=urn:btih:'+hash)
  }

  toggleLanguage(lang: string) {
    if (this.selectedLanguages.includes(lang)) return this.selectedLanguages = this.selectedLanguages.filter(sl => sl !== lang);
    return this.selectedLanguages.push(lang);
  }

  shallowDiff(obj1: Record<string, any>, obj2: Record<string, any>): any {
    const flatObj1 = this.flattenObject(obj1);
    const flatObj2 = this.flattenObject(obj2);
    const diff: any = {};

    for (const key in flatObj1) {
      if (flatObj1.hasOwnProperty(key) && flatObj1[key] !== flatObj2[key]) {
        diff[key] = flatObj2[key];
      }
    }

    for (const key in flatObj2) {
      if (flatObj2.hasOwnProperty(key) && !(key in flatObj1)) {
        diff[key] = flatObj2[key];
      }
    }

    return diff;
  }

  async presentEpisodeDescription(episode: Video) {
    const alert = await this.alertController.create({
      header: episode.name,
      subHeader: this.seCode(episode),
      message: episode.overview,
      buttons: [{
        text: "Buscar magnet",
        handler: () => {
          this.filter.title = this.seCode(episode),
          this.toggleSegment();
        }
      }]
    });

    await alert.present();
  }

  addToLanguages(lang: string) {
    if (this.languages.includes(lang)) return;
    this.languages.push(lang);
  }

  async toggleSegment() {
    this.segment = (this.segment === 'streams' ? 'about' : 'streams')
    if (this.segment === 'streams') {
      this.magnetLoading = true;
      this.magnets = (await lastValueFrom(this.filminhoService.getTorrents(this.imdbID!))).streams;
      this.magnets.forEach(magnet => {
        const languages = magnet.title.split('\n')[2];
        if (languages) {
          magnet.title.split('\n')[2].match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu)?.forEach(e => this.addToLanguages(e))
        }
      })
      this.magnetLoading = false;
    }
  }

  async updateMediaCollection() {
    this.stateService.state = { collections: await lastValueFrom(this.filminhoService.getCollection()) };
  }

  onSearchChange(event: Event) {
    this.filter.title = (event.target as HTMLInputElement).value;
  }

  async fetchMedia() {
    if (this.fallbackMedia) {
      this.media = {
        imdbID: this.fallbackMedia.imdb_id,
        Poster: this.fallbackMedia.poster,
        Title: this.fallbackMedia.name,
        Year: this.fallbackMedia.releaseInfo,
        Type: this.fallbackMedia.type
      }
      this.originalMedia = JSON.parse(JSON.stringify(this.media));
    }
    this.filminhoService.getMedia(this.imdbID!).subscribe(x => {
      if (x) {
        this.media = x;
        if (this.media.Type === 'series' && !this.media.WatchedEpisodes) this.media.WatchedEpisodes = [];
        this.originalMedia = JSON.parse(JSON.stringify(x));
      }
    });
  }

  publishReview(modal: IonModal) {
    console.log(this.media.imdbID)
    this.filminhoService.publishReview(this.media.imdbID!, this.newReview, this.newRemark / 2).subscribe(x => {
      if (this.media.Remarks) this.media.Remarks[this.token] = this.newRemark / 2;
      if (this.media.Reviews) this.media.Reviews[this.token] = this.newReview;
    });
    modal.dismiss();
  }

  saveReview(modal: IonModal) {
    if (this.media.Remarks) this.media.Remarks[this.token] = this.newRemark / 2;
    if (this.media.Reviews) this.media.Reviews[this.token] = this.newReview;
    modal.dismiss();
  }

  async upsert() {
    const loading = await this.loadingController.create();
    loading.present()
    if (this.media._id) {
      await lastValueFrom(this.filminhoService.updateMedia(this.media._id, this.shallowDiff(this.originalMedia, this.media)));
      this.updateMediaCollection();
    } else {
      const newMedia = this.media;
      if (this.metadata) {
        const { meta } = this.metadata;
        if (meta.name) newMedia.Title = meta.name;
        if (meta.year) newMedia.Year = meta.year;
        if (meta.videos) newMedia.Type = meta.videos ? 'series' : 'movie';
        if (meta.poster) newMedia.Poster = meta.poster;
        if (meta.imdb_id) newMedia.imdbID = meta.imdb_id;
      }
      await lastValueFrom(this.filminhoService.createMedia(newMedia));
      this.updateMediaCollection();
    }
    loading.dismiss();
    this.dirty = false;
  }

  isSeasonWatched(season: { key: string, value: Video[] }) {
    const seCodes = season.value.map(this.seCode);
    return seCodes.every(x => this.media.WatchedEpisodes?.includes(x))
  }

  markSeasonAsWatched(season: { key: string, value: Video[] }) {
    const seCodes = season.value.map(this.seCode);
    this.dirty = true;
    if (seCodes.every(x => this.media.WatchedEpisodes?.includes(x))) {
      return this.media.WatchedEpisodes = this.media.WatchedEpisodes?.filter(x => !seCodes.includes(x));
    }
    this.media.WatchedEpisodes = this.media.WatchedEpisodes?.filter(x => !seCodes.includes(x));
    return this.media.WatchedEpisodes?.push(...seCodes);
  }

  markAsWatched(episode: Video) {
    const seCode = this.seCode(episode);
    this.dirty = true;
    if (this.media.WatchedEpisodes?.includes(seCode)) {
      return this.media.WatchedEpisodes = this.media.WatchedEpisodes.filter(se => se !== seCode);
    }
    return this.media.WatchedEpisodes?.push(seCode);
  }

  public seCode = (episode: Video) => `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`;

  generateSeasons(videos: Video[]) {
    const seasons: {[key: number]: Video[]} = {};
    videos.forEach(x => {
      if (seasons[x.season]) {
        return seasons[x.season].push(x)
      }
      return seasons[x.season] = [x]
    })
    return seasons;
  }

  async ngOnInit() {
    this.fetchMedia();
    this.storageService.getItem<string>('token').then(token => {
      this.token = this.deserialize(token || '')
    });
    if (this.imdbID) this.metadata = await lastValueFrom(this.filminhoService.getMediaMetadata(this.type, this.imdbID))
  }

  routeTo(genre: string) {

  }

  getRandomColor(genre: string) {
    return stringToHexColor(genre)
  }

  millisecondsToTimeString(milliseconds: string) {
    const totalSeconds = Math.floor(parseInt(milliseconds) / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return timeString;
  }

  convertMinutesToMilliseconds(min: string): number {
    const minutes = parseInt(min, 10);

    const milliseconds = minutes * 60 * 1000;

    return milliseconds;
  }

  convertMinutesToTimeString(min: string) {
    const minutes = parseInt(min, 10);

    const hours = Math.floor(minutes / 60);
    const minutesRemaining = minutes % 60;
    const seconds = 0;

    const timeString = `${hours}:${minutesRemaining.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return timeString;
  }

}
