import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { FeedItem } from 'src/app/interfaces/feed';
import { FilminhoService } from 'src/app/services/filminho.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  feed: FeedItem[] = [];
  feedRendered: FeedItem[] = [];
  filter = {
    name: null
  }

  async ngOnInit() {
    this.loadFeed();
  }

  loadFeed(event?: {target:{complete:()=>void}}) {
    return this.filminhoService.getFeed().subscribe({next: (res) => {
      this.feed = res;
      this.onLoadMore();
      event?.target.complete();
    }});
  }

  openFeedItem(feedItem: FeedItem) {
    this.router.navigate([feedItem.id], { relativeTo: this.activatedRoute})
  }

  onLoadMore(ev?: InfiniteScrollCustomEvent) {
    this.feedRendered.push(...this.feed.splice(this.feedRendered.length, 10));
    if (ev) ev.target.complete();
  }

}
