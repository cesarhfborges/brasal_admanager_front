import { Component, OnInit } from '@angular/core';
import {AtendentesService} from '../../../shared/services/atendentes.service';
import {Atendente} from '../../../shared/models/atendente';
import {Pagination} from '../../../shared/models/pagination';

@Component({
  selector: 'ngx-atendentes-list',
  templateUrl: './atendentes-list.component.html',
  styleUrls: ['./atendentes-list.component.scss']
})
export class AtendentesListComponent implements OnInit {

  atendentes: Atendente[];

  pagination: Pagination;

  loading = {
    filiais: false,
    atendentes: false,
  };

  cols = [
    {field: 'id', header: '#', width: '160px', class: 'text-center'},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'station_id', header: 'Filial', width: '100px', class: 'text-center'},
  ];

  constructor(
    private atendentesService: AtendentesService,
  ) { }

  ngOnInit(): void {
    this.getAtendentes();
  }

  getAtendentes(page: number = 1) {
    this.atendentesService.getAtendentes(page).subscribe(
      response => {
        // @ts-ignore
        console.log(response.data);
        // @ts-ignore
        this.atendentes = response.data;
        this.pagination = response;
        delete this.pagination['data'];
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace('https://hpix.brasal.com.br/api/sandbox/admin/attendants?page=', ''))
  }
}
