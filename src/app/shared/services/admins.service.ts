import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAdmins(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.urlApi}/admins`);
  }

  createAdmin(data): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.urlApi}/admins`, data);
  }

  showAdmin(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.urlApi}/admins/${id}`);
  }

  updateAdmin(id: number, data): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.urlApi}/admins/${id}`, data);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/admins/${id}`);
  }
}
