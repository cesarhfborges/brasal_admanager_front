import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/error') {
      return true;
    } else if (this.authService.isAuthenticated()) {
      if (['/auth/login', '/auth/recuperar-senha'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (['/auth/login', '/auth/recuperar-senha'].includes(state.url)) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (state.url === '/error') {
      return true;
    } else if (this.authService.isAuthenticated()) {
      if (['/auth/login', '/auth/recuperar-senha'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (['/auth/login', '/auth/recuperar-senha'].includes(state.url)) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
  }
}
