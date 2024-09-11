import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { FeedItem } from 'src/app/interfaces/feed';
import { Media } from 'src/app/interfaces/media';
import { MovieMetaData, QueryMedia, Video } from 'src/app/interfaces/metadata';
import { FilminhoService } from 'src/app/services/filminho.service';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';
import { stringToHexColor } from 'src/app/utils';

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
    private stateService: StateService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media.imdbID = this.id;
    const navigation = this.router.getCurrentNavigation();
    this.fallbackMedia = navigation?.extras.state?.['fallback'];
  }

  newRemark = 0;
  newReview: string = '';
  editable = true;
  dirty = false;
  loading = false;
  id: string | null;
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
    if (this.media.Remarks && this.media.Remarks[this.token] && this.media.Reviews && this.media.Reviews[this.token]) {
      this.newRemark = this.media.Remarks[this.token] * 2;
      this.newReview = this.media.Reviews[this.token];
    }
    modal.present();
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

  async updateMediaCollection() {
    this.stateService.state = { collections: await lastValueFrom(this.filminhoService.getCollection()) };
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
    this.stateService.state$.subscribe(x => {
      const media = x.collections?.find(collection => collection.imdbID === this.id);
      if (media) {
        this.media = media;
        this.originalMedia = JSON.parse(JSON.stringify(media));
      }
    })
  }

  publishReview() {
    if (this.media.Remarks) this.media.Remarks[this.token] = this.newRemark / 2;
    if (this.media.Reviews) this.media.Reviews[this.token] = this.newReview;
  }

  async upsert() {
    const loading = await this.loadingController.create();
    loading.present()
    if (this.media._id) {
      const result = await lastValueFrom(this.filminhoService.updateMedia(this.media._id, this.shallowDiff(this.originalMedia, this.media)));
      if (result.statusCode === 201) this.updateMediaCollection();
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
      const result = await lastValueFrom(this.filminhoService.createMedia(newMedia));
      if (result.statusCode === 201) this.updateMediaCollection();
    }
    loading.dismiss();
    this.dirty = false;
  }

  markAsWatched(episode: Video) {
    const seCode = `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`;
    if (this.media.WatchedEpisodes) {
      return this.media.WatchedEpisodes.push(seCode);
    }
    return this.media.WatchedEpisodes = [seCode]
  }

  isActive(episode: Video) {
    this.media.WatchedEpisodes = ['S01E01'];
    const seCode = `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`;
    if (this.media.WatchedEpisodes) {
      return this.media.WatchedEpisodes.includes(seCode);
    }
    return false;
  }

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
    this.storageService.get('token').then(token => this.token = token);
    if (this.id) this.metadata = await lastValueFrom(this.filminhoService.getMediaMetadata(this.id))
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
