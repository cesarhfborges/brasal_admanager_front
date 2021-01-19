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

  getAtendentes(options = {page: 1, limit: 15, sort: 'name', station: 0}): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/attendants?page=${options.page}&limit=${options.limit}&sort=${options.sort}&stationId=${options.station}`);
  }

  getAtendentesCombo(posto: number): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/attendants/to-combobox?station_id=${posto}`);
  }

  updateAtendentes(id: number, atendente): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/attendants/${id}`, atendente);
  }

  createAtendentes(atendente): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/attendants`, atendente);
  }
}
