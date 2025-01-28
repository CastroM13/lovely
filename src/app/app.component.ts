import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { addIcons } from 'ionicons';
import { StateService } from './services/state.service';
import { FilminhoService } from './services/filminho.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public storageService: StorageService, private stateService: StateService, private filminhoService: FilminhoService) {
    storageService.init();
    addIcons({
      'lovely': 'assets/icon/lovely.svg'
    })
  }

  async ngOnInit() {
    this.stateService.state = {collections: await lastValueFrom(this.filminhoService.getCollection())};
    const localThemes = await this.storageService.getObject<{[key: string]: string}>("theme");
    if (localThemes) {
      Object.entries(localThemes).forEach(theme => document.documentElement.style.setProperty(theme[0], theme[1]))
    }
  }
}
