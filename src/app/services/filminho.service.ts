import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Media } from '../interfaces/media';
import { FeedItem } from '../interfaces/feed';
import { MovieMetaData } from '../interfaces/metadata';

@Injectable({
  providedIn: 'root'
})
export class FilminhoService {

  constructor(private http: HttpClient) { }

  auth(token: string) {
    return this.http.get<{token?: string}>(`${environment.filminhoUrl}/login`, { params: { token } })
  }

  getCollection() {
    return this.http.get<Media[]>(`${environment.filminhoUrl}/query`)
  }

  getFeed() {
    return this.http.get<FeedItem[]>(environment.feedUrl)
  }

  getMediaMetadata(tt: string) {
    return this.http.get<MovieMetaData>(environment.metadaDataUrl(tt))
    
  }
}
