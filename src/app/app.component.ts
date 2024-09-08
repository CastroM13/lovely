import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public storageService: StorageService) {
    storageService.init();
    addIcons({
      'lovely': 'assets/icon/lovely.svg'
    })
  }
}
