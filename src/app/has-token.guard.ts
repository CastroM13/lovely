import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';

export const hasTokenGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = await storageService.getItem('token');
  
  return !token || router.parseUrl('/modules/filminho')
};
