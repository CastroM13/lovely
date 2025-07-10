import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';

export const tokenGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  await storageService.init();
  const token = await storageService.getItem('token');
  
  if (token) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
