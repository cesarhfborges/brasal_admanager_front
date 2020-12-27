import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LdapUser} from '../models/ldap-user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(): Observable<LdapUser[]> {
    return this.http.get<LdapUser[]>(`${environment.urlApi}/usuarios`);
  }
}
