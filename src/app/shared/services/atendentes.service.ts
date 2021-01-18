import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtendentesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAtendentes(page: number = 1): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/attendants?page=${page}`);
  }
}
