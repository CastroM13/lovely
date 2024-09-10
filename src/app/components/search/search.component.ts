import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { forkJoin, lastValueFrom } from 'rxjs';
import { FeedItem } from 'src/app/interfaces/feed';
import { Meta, MovieSearchMetaData } from 'src/app/interfaces/metadata';
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
  searchData: Meta[] | undefined;
  feedRendered: FeedItem[] = [];
  filter = {
    name: null
  }

  async ngOnInit() {
    this.loadFeed();
  }

  async search(ev: any) {
    const value = ev.detail.value;
    if (value === '' || value === null || value === undefined) delete this.searchData;
    this.searchData = ((await lastValueFrom(forkJoin([this.filminhoService.search('series',value), this.filminhoService.search('movie', value)]))).map(x => x.metas) as any).flat();
  }

  loadFeed(event?: {target:{complete:()=>void}}) {
    return this.filminhoService.getFeed().subscribe({next: (res) => {
      this.feed = res;
      this.onLoadMore();
      event?.target.complete();
    }});
  }

  openFeedItem(feedItem: FeedItem) {
    this.router.navigate([feedItem.id], { relativeTo: this.activatedRoute, state: { fallback: feedItem } })
  }

  onLoadMore(ev?: InfiniteScrollCustomEvent) {
    this.feedRendered.push(...this.feed.splice(this.feedRendered.length, 10));
    if (ev) ev.target.complete();
  }

}
