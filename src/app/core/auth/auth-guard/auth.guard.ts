import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getCurrentRole(); 



  if (!role) {
    if (state.url !== '/login') {
      router.navigate(['/login']);
    }
    return state.url === '/login';
  }


  if (state.url === '/login') {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  const allowedRoles: string[] = route.data?.['allowedRoles'] || [];

  if (!allowedRoles.includes(role)) {
    console.log('User not authorized, redirecting to unauthorized');
    router.navigate(['/unauthorized']); 
    return false;
  }

  return true; 
};