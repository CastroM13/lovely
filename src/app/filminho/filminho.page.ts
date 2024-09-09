import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { FilminhoService } from '../services/filminho.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-filminho',
  templateUrl: 'filminho.page.html',
  styleUrls: ['filminho.page.scss']
})
export class FilminhoPage implements OnInit {

  constructor(private stateService: StateService, private filminhoService: FilminhoService) { }

  async ngOnInit() {
    this.stateService.state = {collections: await lastValueFrom(this.filminhoService.getCollection())};
    console.log(1)
  }

}
