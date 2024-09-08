import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  public async clear(): Promise<void> {
    await this._storage?.clear();
  }

  public async keys(): Promise<string[] | undefined> {
    return this._storage?.keys();
  }

  public async length(): Promise<number | undefined> {
    return this._storage?.length();
  }

  public async setObject(key: string, object: any): Promise<void> {
    await this._storage?.set(key, JSON.stringify(object));
  }

  public async getObject<T>(key: string): Promise<T | null> {
    const data = await this._storage?.get(key);
    return data ? JSON.parse(data) : null;
  }

  public async key(index: number): Promise<string | undefined> {
    return (await this._storage?.keys())!.find((_, i) => i === index);
  }
}
