import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SweetAlertService } from '../services/sweet-alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const sweetAlertService = inject(SweetAlertService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      //initial error message
      let errorMessage = 'Something went wrong';

      if (error.status === 0) {
        errorMessage = 'Network error';
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Server Error';
            break;
        }
      }

      //are we running in a browser?
      /**
       * If your Angular app uses SSR (Angular Universal), the code runs twice:
            Once on the server (Node.js) — to generate HTML
            Once on the browser — to hydrate the app */
        //So this check prevents SweetAlert2 from running on the server.
      if (typeof window !== 'undefined') {
        sweetAlertService.error('oops...', errorMessage);
      }

      return throwError(() => errorMessage);
    })
  );
};
