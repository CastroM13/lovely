import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent  implements OnInit {

  constructor(private module: ModulesService) { }

  ngOnInit() {}

  openModuleMenu = () => this.module.toggleMenu();


}
