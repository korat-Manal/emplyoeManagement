import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getCurrentRole();

  if (!role) {
    if (state.url === '/login') {
      return true;
    }
    router.navigate(['/login']);
    return false;
  }

  if (state.url === '/login') {
    router.navigate(['/admin/dashboard']); 
    return false;
  }

  const allowedRoles = route.data?.['allowedRoles'] as string[];

  if (!allowedRoles.includes(role)) {
  
    router.navigate(['/']);
    return false;
  }

  return true;  
};