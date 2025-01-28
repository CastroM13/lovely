import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit {
  constructor(private storageService: StorageService) { }

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

  async ngOnInit() {
    const localThemes = await this.storageService.getObject<{[key: string]: string}>("theme");
    if (localThemes) {
      Object.entries(localThemes).forEach(theme => this.colors[this.colors.findIndex(color => color.key === theme[0])].value = theme[1])
    }
  }

  async applyTheme(key: string, color: string) {
    const localTheme = await this.storageService.getObject<{ [key: string]: string }>("theme");
    if (localTheme) {
      localTheme[key] = color;
      this.storageService.setObject("theme", localTheme);
    } else {
      this.storageService.setObject("theme", { [key]: color });
    }
    document.documentElement.style.setProperty(key, color);
  }
}
