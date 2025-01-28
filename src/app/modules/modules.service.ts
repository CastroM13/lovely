import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModuleSelectorComponent } from '../components/module-selector/module-selector.component';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private modalController: ModalController) { }

  async toggleMenu() {
    const modal = await this.modalController.create({
      component: ModuleSelectorComponent,
      cssClass: 'card-menu',
    });

    await modal.present();
  }
}
