import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;
  private readonly subjects = new Map<string, Subject<any>>();

  constructor(private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    if (this.storage) {
      await this.storage.set(key, value);
      this.getSubject(key).next(value);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    if (this.storage) {
      return await this.storage.get(key);
    }
    return null;
  }

  subscribe<T>(key: string): Observable<T | null> {
    return new Observable<T | null>(observer => {
      this.init().then(() => {
        this.getItem<T>(key).then(value => {
          observer.next(value);
          
          const subject = this.getSubject<T>(key);
          const subscription = subject.subscribe(value => observer.next(value));
          
          return () => subscription.unsubscribe();
        });
      });
    });
  }

  private getSubject<T>(key: string): Subject<T> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new Subject<T>());
    }
    return this.subjects.get(key)!;
  }

  async removeItem(key: string): Promise<void> {
    if (this.storage) {
      await this.storage.remove(key);
      this.getSubject(key).next(null);
    }
  }

  async clear(): Promise<void> {
    if (this.storage) {
      await this.storage.clear();
      this.subjects.forEach(subject => subject.next(null));
    }
  }

  async getObject<T>(key: string): Promise<T | null> {
    return this.getItem<T>(key);
  }

  async setObject<T>(key: string, value: T): Promise<void> {
    return this.setItem<T>(key, value);
  }
}
