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
import {ToastService} from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // if (err.status === 500) {
      //   this.toastService.showToastDanger('Não foi possível conectar ao service LDAP.', 'Atenção');
      // }
      if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[2]) && err.status === 401) {
        this.authService.logout(); // auto logout if 401 response returned from api backend
      }
      // if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[1]) && err.status === 403) {
      //   this.router.navigate(['/home']);
      // }
      //
      // if (!['login', 'cadastro', 'recuperarsenha'].includes(this.router.url.split('/')[1]) && err.status === 404) {
      //   this.router.navigate(['/home']);
      // }
      // const error = err.error.message || err.statusText;
      return throwError({...err.error});
    }))
  }
}
