import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from '../interfaces/media';
import { FeedItem } from '../interfaces/feed';
import { Magnet, MovieMetaData, MovieSearchMetaData } from '../interfaces/metadata';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilminhoService {

  private authHeader: { Authorization: string } = { Authorization: '' };

  constructor(private http: HttpClient, private toastController: ToastController, private storage: StorageService) {
    this.initializeTokenSubscription();
  }

  private async initializeTokenSubscription() {
    
    const initialToken = await this.storage.getItem<string>('token');
    if (initialToken) {
      this.authHeader = { 'Authorization': `Bearer ${initialToken}` };
    }
    
    this.storage.subscribe<string>('token').subscribe(token => {
      console.log('Token updated:', token);
      this.authHeader = { 'Authorization': `Bearer ${token}` };
    });
  }

  error = async (msg: string) => (await this.toastController.create({
    message: msg,
    color: 'warning',
    icon: 'warning-outline',
    duration: 2000
  })).present();

  auth(token: string) {
    return this.http.post(`${environment.url}/auth`, { token }, { responseType: 'text' })
      .pipe(
        map((res: string) => {
          console.log(res);
          if (res) return res;
          throw Error("Token inválido");
        }),
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while validating the token.'));
        })
      )
  }

  getCollection() {
    return this.http.get<Media[]>(`${environment.url}/media`, { headers: this.authHeader })
      .pipe(
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while fetching the collection.'));
        })
      );
  }

  getMedia(imdbID: string) {
    return this.http.get<Media>(`${environment.url}/media/${imdbID}`, { headers: this.authHeader })
      .pipe(
        catchError((err: Error) => {
          if (err.message.includes('404')) return of(null);
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while fetching the collection.'));
        })
      );
  }
  
  createMedia(media: Partial<Media>) {
    return this.http.post<Media>(`${environment.url}/media`, media, { headers: this.authHeader })
      .pipe(
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while creating media.'));
        })
      );
  }
  
  updateMedia(id: string, media: Partial<Media>) {
    return this.http.patch<Media>(`${environment.url}/media/${id}`, media, { headers: this.authHeader })
      .pipe(
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while updating media.'));
        })
      );
  }

  publishReview(imdbID: string, review: string, remark: number) {
    return this.http.patch<Media>(`${environment.url}/media/${imdbID}/review`, { review, remark }, { headers: this.authHeader })
      .pipe(
        catchError((err: Error) => {
          this.error(err.message);
          return throwError(() => new Error(err.message || 'An error occurred while publishing review.'));
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
