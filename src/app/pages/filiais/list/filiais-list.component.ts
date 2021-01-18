import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';
import {Pagination} from '../../../shared/models/pagination';

@Component({
  selector: 'ngx-filiais-list',
  templateUrl: './filiais-list.component.html',
  styleUrls: ['./filiais-list.component.scss']
})
export class FiliaisListComponent implements OnInit {


  loading = {
    filiais: false,
  };

  pagination: Pagination;

  postos: Posto[];

  cols = [
    {field: 'id', header: '#', width: '100px', class: 'text-center'},
    {field: 'cnpj', header: 'CNPJ', width: 'auto', class: ''},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
  ];


  constructor(
    private router: Router,
    private postosService: PostosService,
  ) {
  }

  ngOnInit(): void {
    this.getPostos(1);
  }

  getPostos(page: number) {
    this.loading.filiais = true;
    this.postosService.getPostos(page).subscribe(
      response => {
        console.log(response);
        this.loading.filiais = false;
        this.postos = response.data;
        this.pagination = response;
        delete this.pagination['data'];
      },
      e => {
        console.log(e);
        this.loading.filiais = false;
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace('https://hpix.brasal.com.br/api/sandbox/admin/users?page=', ''))
  }
}
