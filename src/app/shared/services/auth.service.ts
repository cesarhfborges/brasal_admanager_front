import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  isAuthenticated(): Boolean {
    return !!localStorage.getItem('contents');
  }

  getUser(): Usuario {
    return JSON.parse(atob(localStorage.getItem('contents'))).user;
  }

  getToken(): string {
    return JSON.parse(atob(localStorage.getItem('contents'))).access_token;
  }

  login({username, password, remember}): Observable<boolean> {
    return this.http.post<any>(`${environment.urlApi}/auth/login`, {username, password, remember})
      .pipe(map(response => {
        localStorage.setItem('contents', btoa(JSON.stringify(response)));
        // localStorage.setItem('contents', JSON.stringify(response));
        return true;
      }));
    // this.route.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('contents');
    window.location.reload();
  }
}
