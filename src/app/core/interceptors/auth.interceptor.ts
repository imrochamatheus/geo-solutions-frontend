import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.debug('Unauthorized request', error);

          router.navigate(['/auth/signin'], {
            queryParams: { returnUrl: router.routerState.snapshot.url },
          });

          return throwError(() => new Error('Unauthorized request'));
        }

        if (error.status === 403) {
          console.debug('Forbidden request', error);

          router.navigate(['/']);

          return throwError(() => new Error('Forbidden request'));
        }
      }

      return throwError(() => error);
    })
  );
};
