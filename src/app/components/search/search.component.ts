import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { forkJoin, lastValueFrom } from 'rxjs';
import { FeedItem } from 'src/app/interfaces/feed';
import { Meta, MovieSearchMetaData } from 'src/app/interfaces/metadata';
import { QueryPipe } from 'src/app/pipes/query.pipe';
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

  query = new QueryPipe();
  feed: FeedItem[] = [];
  searchValue: string | undefined;
  searchData: Meta[] | undefined;
  feedRendered: FeedItem[] = [];
  filter: Partial<FeedItem> = {
    type: null
  };

  async ngOnInit() {
    this.loadFeed();
  }

  async search() {
    if (this.searchValue === '' || this.searchValue === null || this.searchValue === undefined) {
      delete this.searchData;
      return;
    };
  
    this.searchData = this.filter.type
    ? (await lastValueFrom(this.filminhoService.search(this.filter.type, this.searchValue))).metas
    : ((await lastValueFrom(forkJoin([this.filminhoService.search('series',this.searchValue), this.filminhoService.search('movie', this.searchValue)]))).map(x => x.metas) as any).flat();
  }

  async loadFeed(event?: {target:{complete:()=>void}}) {
    if (this.searchValue) {
      this.search();
      event?.target.complete();
      return;
    }
    this.feed = await lastValueFrom(this.filminhoService.getFeed());
    this.onLoadMore();
    event?.target.complete();
    return;
  }

  openFeedItem(feedItem: FeedItem) {
    this.router.navigate([feedItem.id], { relativeTo: this.activatedRoute, state: { fallback: feedItem }, queryParams: { type: feedItem.type } })
  }

  randomHexColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') + 55;

  onLoadMore(ev?: InfiniteScrollCustomEvent) {
    this.feedRendered.push(...this.query.transform(this.feed, this.filter).slice(this.feedRendered.length, this.feedRendered.length + 10));
    if (ev) ev.target.complete();
  }

  updateFeedType() {
    if (this.searchValue) {
      this.search();
      return;
    }
    this.feedRendered = [];
    this.feedRendered.push(...this.query.transform(this.feed, this.filter).slice(this.feedRendered.length, this.feedRendered.length + 10));
  }

}
