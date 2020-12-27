import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {Router} from '@angular/router';
import {ToastService} from './toast.service';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario;
  private token: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService,
  ) {
    const contents = localStorage.getItem('contents');
    if (!isNull(contents)) {
      this.usuario = JSON.parse(atob(contents)).user;
      this.token = JSON.parse(atob(contents)).access_token;
    }
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
        if (!environment.production) {
          localStorage.setItem('contents_backup', JSON.stringify(response));
        }
        return true;
      }));
    // this.route.navigate(['/dashboard']);
  }

  logout(): void {
    this.logoutExec().subscribe(
      response => {
        this.toastService.showToastSuccess('Logout efetuado com sucesso', '')
      },
      error => {
        localStorage.removeItem('contents');
        this.usuario = null;
        this.token = null;
        window.location.reload();
      },
      () => {
        localStorage.removeItem('contents');
        this.usuario = null;
        this.token = null;
        window.location.reload();
      }
    );
  }

  private logoutExec(): Observable<any> {
    return this.http.get(`${environment.urlApi}/auth/logout`);
  }
}
