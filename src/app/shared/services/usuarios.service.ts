import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(page: number = 1): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/users?page=${page}`);
  }

  updateUsuarios(id: number, usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.urlApi}/users/${id}`, usuario);
  }
}
