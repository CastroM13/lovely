import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';

export const hasTokenGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = await storageService.get('token');

  console.log(token)
  
  if (token) {
    router.navigate(['/filminho']);
  }

  return token ? false : true;
};
