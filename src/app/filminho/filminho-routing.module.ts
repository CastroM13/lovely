import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilminhoPage } from './filminho.page';
import { SearchComponent } from '../components/search/search.component';
import { CollectionComponent } from '../components/collection/collection.component';
import { MediaComponent } from '../components/media/media.component';

const routes: Routes = [
  {
    path: '',
    component: FilminhoPage,
    children: [
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'search/:id',
        component: MediaComponent
      },
      {
        path: 'collection',
        component: CollectionComponent
      },
      {
        path: 'collection/:id',
        component: MediaComponent
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/filminho/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FilminhoPageRoutingModule {}
