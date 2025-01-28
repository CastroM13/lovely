import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StateService } from './services/state.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from './modules/shared.module';
import { FormsModule } from '@angular/forms';
import { CollectionComponent } from './components/collection/collection.component';
import { SearchComponent } from './components/search/search.component';
import { MediaComponent } from './components/media/media.component';
import { ModulesComponent } from './modules/modules.component';
import { FilminhoComponent } from './modules/filminho/filminho.component';
import { ModuleSelectorComponent } from './components/module-selector/module-selector.component';
import { NamoricoComponent } from './modules/namorico/namorico.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
@NgModule({
  declarations: [AppComponent, CollectionComponent, SearchComponent, MediaComponent, ModulesComponent, FilminhoComponent, NamoricoComponent, ModuleSelectorComponent, RecipesComponent, SettingsComponent, AppSettingsComponent, UserSettingsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
