import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from '../interfaces/media';
import { FeedItem } from '../interfaces/feed';
import { MovieMetaData, MovieSearchMetaData } from '../interfaces/metadata';

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

  createMedia(media: Partial<Media>) {
    return this.http.post<{statusCode: number}>(`${environment.filminhoUrl}/create`, media)
  }

  updateMedia(id: string, media: Partial<Media>) {
    return this.http.patch<{statusCode: number}>(`${environment.filminhoUrl}/update`, media, { params: { id }})
  }

  getFeed() {
    return this.http.get<FeedItem[]>(environment.feedUrl)
  }

  getMediaMetadata(type: 'series' | 'movie', tt: string) {
    console.log(type)
    return this.http.get<MovieMetaData>(environment.metadaDataUrl(type, tt))
  }

  search(type: 'series' | 'movie', value: string) {
    return this.http.get<MovieSearchMetaData>(environment.searchUrl(type, value))
  }
}
