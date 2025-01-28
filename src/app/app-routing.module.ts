import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { tokenGuard } from './token.guard';
import { hasTokenGuard } from './has-token.guard';
import { SearchComponent } from './components/search/search.component';
import { MediaComponent } from './components/media/media.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ModulesComponent } from './modules/modules.component';
import { FilminhoComponent } from './modules/filminho/filminho.component';
import { NamoricoComponent } from './modules/namorico/namorico.component';
import { DatesComponent } from './components/dates/dates.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [hasTokenGuard]
  },
  {
    path: "modules",
    component: ModulesComponent,
    canActivate: [tokenGuard],
    children: [
      {
        path: 'filminho',
        component: FilminhoComponent,
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
        path: 'namorico',
        component: NamoricoComponent,
        children: [
          {
            path: 'dates',
            component: DatesComponent
          },
          {
            path: 'recipes',
            component: RecipesComponent
          },
          {
            path: '',
            redirectTo: 'recipes',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'user',
            component: UserSettingsComponent
          },
          {
            path: 'app',
            component: AppSettingsComponent
          },
          {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'filminho',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
