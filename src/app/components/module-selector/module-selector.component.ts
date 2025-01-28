import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrls: ['./module-selector.component.scss'],
})
export class ModuleSelectorComponent  implements OnInit {

  constructor(public router: Router, public modal: ModalController) { }

  modules = [
    {
      title: "Filminho",
      icon: "assets/filminho.svg",
      url: "modules/filminho"
    },
    {
      title: "Namorico",
      icon: "assets/namorico.svg",
      url: "modules/namorico"
    },
    {
      title: "Configurações",
      icon: "assets/config.svg",
      url: "modules/settings"
    }
  ]

  ngOnInit() {}

}
