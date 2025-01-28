import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from '../interfaces/media';
import { FeedItem } from '../interfaces/feed';
import { Magnet, MovieMetaData, MovieSearchMetaData } from '../interfaces/metadata';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FilminhoService {

  constructor(private http: HttpClient, private toastController: ToastController) { }

  neureloHeader = { 'X-API-KEY': environment.neureloToken };
  error = async (msg: string) => (await this.toastController.create({
    message: msg,
    color: 'warning',
    icon: 'warning-outline',
    duration: 2000
  })).present();

  auth(token: string) {
    return this.http.get<{ data: { token: string }[] }>(`${environment.neureloUrl}/token`, { params: { filter: `{"token":{"equals":"${token}"}}` }, headers: this.neureloHeader })
      .pipe(
        map(res => {
          if (res.data.length > 0) return res.data[0];
          throw Error("Token inválido");
        }),
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while validating the token.'));
        })
      )
  }

  getCollection() {
    return this.http.get<{ data: Media[] }>(`${environment.neureloUrl}/trackerstore`, { headers: this.neureloHeader })
      .pipe(map(res => res.data),
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while validating the token.'));
        })
      );
  }

  createMedia(media: Partial<Media>) {
    return this.http.post<{ data: Media }>(`${environment.neureloUrl}/trackerstore/__one`, media, { headers: this.neureloHeader })
      .pipe(map(res => res.data),
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while validating the token.'));
        })
      );
  }

  updateMedia(id: string, media: Partial<Media>) {
    return this.http.patch<{ data: Media }>(`${environment.neureloUrl}/trackerstore/${id}`, media, { headers: this.neureloHeader })
      .pipe(map(res => res.data),
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while validating the token.'));
        })
      );
  }

  getFeed() {
    return this.http.get<FeedItem[]>(environment.feedUrl)
  }

  getMediaMetadata(type: 'series' | 'movie', tt: string) {
    return this.http.get<MovieMetaData>(environment.metadaDataUrl(type, tt))
  }

  getTorrents(tt: string) {
    return this.http.get<{ streams: Magnet[] }>(environment.torrentUrl(tt))
  }

  search(type: 'series' | 'movie', value: string) {
    return this.http.get<MovieSearchMetaData>(environment.searchUrl(type, value))
  }
}
