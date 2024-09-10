import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilminhoPageRoutingModule } from './filminho-routing.module';

import { FilminhoPage } from './filminho.page';
import { CollectionComponent } from '../components/collection/collection.component';
import { SearchComponent } from '../components/search/search.component';
import { MediaComponent } from '../components/media/media.component';
import { SharedModule } from '../modules/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    FilminhoPageRoutingModule
  ],
  declarations: [FilminhoPage, CollectionComponent, SearchComponent, MediaComponent]
})
export class FilminhoPageModule {}
