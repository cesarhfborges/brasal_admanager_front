import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      // if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[1]) && err.status === 401) {
      //   // auto logout if 401 response returned from api
      //   this.authService.logout();
      // }
      //
      // if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[1]) && err.status === 403) {
      //   this.router.navigate(['/home']);
      // }
      //
      // if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[1]) && err.status === 404) {
      //   this.router.navigate(['/home']);
      // }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
