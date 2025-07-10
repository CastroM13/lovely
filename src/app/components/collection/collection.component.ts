import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Media, MediaStatus, MediaStatusType } from 'src/app/interfaces/media';
import { FilminhoService } from 'src/app/services/filminho.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  mediaCollection: Media[] = [];
  status: Map<MediaStatusType, {name: string, color: string}> = new Map([
    [MediaStatus.WATCHED, {name: 'checkmark-circle-outline', color: 'green'}],
    [MediaStatus.WATCHING, {name: 'play-circle-outline', color: 'blue'}],
    [MediaStatus.PENDING, {name: 'time-outline', color: 'gray'}]
  ]);
  visibleFilter = false;
  filter: Partial<Media> = {
    Status: null
  }

  ngOnInit(): void {
    this.loadMediaCollection();
  }

  openMedia(media: Media) {
    this.router.navigate([media.imdbID], { relativeTo: this.activatedRoute, queryParams: { type: media.Type} })
  }

  async loadMediaCollection(event?: { target: { complete: () => void } }) {
    this.mediaCollection = (await lastValueFrom(this.filminhoService.getCollection())).reverse();
    event?.target.complete();
  }
}
