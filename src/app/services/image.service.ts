import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CloudinaryResponse } from '../interfaces/cloudinary-response';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly apiUrl = 'https://api.cloudinary.com/v1_1/dxecgaqps/image/upload';
  private readonly uploadPreset = 'ahjvfiwc';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<CloudinaryResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post<CloudinaryResponse>(this.apiUrl, formData);
  }
}