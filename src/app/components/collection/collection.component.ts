import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Media } from 'src/app/interfaces/media';
import { FilminhoService } from 'src/app/services/filminho.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {

  constructor(
    private filminhoService: FilminhoService,
    private stateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    stateService.state$.subscribe(x => {
      this.mediaCollection = x.collections?.reverse() || [];
    })
  }

  mediaCollection: Media[] = [];

  filter = {
    order: 'DESC',
    title: null
  }

  openMedia(media: Media) {
    this.router.navigate([media.imdbID], { relativeTo: this.activatedRoute})
  }

  async loadMediaCollection(event?: {target:{complete:()=>void}}) {
    this.stateService.state = {collections: await lastValueFrom(this.filminhoService.getCollection())};
    event?.target.complete();
  }
}
