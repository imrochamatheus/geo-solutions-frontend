import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  const isAuthRoute = state.url.startsWith('/auth');
  const router = inject(Router);

  if (!isAuthenticated && isAuthRoute) {
    return true;
  }

  if (isAuthenticated && isAuthRoute) {
    router.navigate(['/']);
    return false;
  }

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
