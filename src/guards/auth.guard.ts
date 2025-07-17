import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    if (authService.isAuthenticated()) {
      return true;
    }
  } catch (error) {
    console.error('Error in auth guard:', error);
  }

  router.navigate(['/login']);
  return false;
};