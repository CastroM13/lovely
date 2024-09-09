import { Injectable } from '@angular/core';
import { Media } from '../interfaces/media';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Plugins } from '@capacitor/core';
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
			this.write('state', state);
			this.state$.next(state);
		} else {
			this.remove('state');
			this.state$.next({});
		}
	}

	get state(): GlobalState {
		return this.savedState;
	}

	write(key: string, val: any) {
		return this.storage.set(key, val);
	}

	remove(key: string) {
		return this.storage.remove(key);
	}
}
