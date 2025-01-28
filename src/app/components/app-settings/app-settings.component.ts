import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent {
  constructor(private renderer: Renderer2, private platform: Platform) {}

  selectedColor: string = 'default';
  customColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary').trim();
  colors = [
    {
      title: "Cor principal",
      key: '--ion-color-primary',
      value: this.getColor('--ion-color-primary')
    },
    {
      title: "Cor secundária",
      key: '--ion-color-secondary',
      value: this.getColor('--ion-color-secondary')
    },
    {
      title: "Cor terciária",
      key: '--ion-color-tertiary',
      value: this.getColor('--ion-color-tertiary')
    }
  ]

  getColor(clss: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(clss).trim()
  }

  applyTheme(key: string, color: string) {
    document.documentElement.style.setProperty(key, color);
  }
}
