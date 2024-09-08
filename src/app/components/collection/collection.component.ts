import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from 'src/app/interfaces/media';
import { FilminhoService } from 'src/app/services/filminho.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent  implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  mediaCollection: Media[] = [];

  filter = {
    order: 'DESC',
    title: null
  }

  ngOnInit() {
    this.loadMediaCollection();
  }

  openMedia(media: Media) {
    this.router.navigate([media.imdbID], { relativeTo: this.activatedRoute})
  }

  loadMediaCollection(event?: {target:{complete:()=>void}}) {
    return this.filminhoService.getCollection().subscribe({next: (res) => {
      this.mediaCollection = res.reverse();
      event?.target.complete();
    }});
  }
}
