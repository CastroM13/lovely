import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-filminho',
  templateUrl: './filminho.component.html'
})
export class FilminhoComponent  implements OnInit {

  isMobile = false;

  constructor(private module: ModulesService, private platform: Platform) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  openModuleMenu = () => this.module.toggleMenu();

}
