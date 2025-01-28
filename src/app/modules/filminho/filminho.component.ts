import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-filminho',
  templateUrl: './filminho.component.html'
})
export class FilminhoComponent  implements OnInit {

  constructor(private module: ModulesService) { }

  ngOnInit() {}

  openModuleMenu = () => this.module.toggleMenu();

}
