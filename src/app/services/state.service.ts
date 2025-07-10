import { Injectable } from '@angular/core';
import { Media } from '../interfaces/media';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

export interface GlobalState {
  collections?: Media[];
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
	private savedState: GlobalState = {};
	state$: Subject<GlobalState> = new BehaviorSubject({});
  constructor(private storage: StorageService) { }

	set state(state) {
		this.savedState = state;
		if (state) {
			this.write('state', state).then(() => {
				this.state$.next(state);
			});
		} else {
			this.remove('state').then(() => {
				this.state$.next({});
			});
		}
	}

	get state(): GlobalState {
		return this.savedState;
	}

	async write(key: string, val: any) {
		return await this.storage.setItem(key, val);
	}

	async remove(key: string) {
		return await this.storage.removeItem(key);
	}
}
