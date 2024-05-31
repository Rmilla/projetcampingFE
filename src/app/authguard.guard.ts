import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // if (authService.isAuth.value == false) {
  //     router.navigate(['/auth']);
  //     return false;
  // }

  // return authService.isAuth.value;
  return true;
};
