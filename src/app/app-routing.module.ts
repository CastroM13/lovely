import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { tokenGuard } from './token.guard';
import { hasTokenGuard } from './has-token.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [hasTokenGuard]
  },
  {
    path: 'filminho',
    loadChildren: () => import('./filminho/filminho.module').then(m => m.FilminhoPageModule),
    canActivate: [tokenGuard]
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
