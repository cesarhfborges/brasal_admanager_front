import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getPostos(page: number = 1): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/stations?page=${page}`);
  }

  getPostosCombo(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/stations/to-combobox`);
  }

  updatePosto(id: number, posto): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/stations/${id}`, posto);
  }

  createPosto(posto): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/stations`, posto);
  }
}
