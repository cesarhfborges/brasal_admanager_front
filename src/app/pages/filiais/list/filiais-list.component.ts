import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';
import {StateService} from '../../../@core/utils';

@Component({
  selector: 'ngx-filiais-list',
  templateUrl: './filiais-list.component.html',
  styleUrls: ['./filiais-list.component.scss']
})
export class FiliaisListComponent implements OnInit {

  pagSetup = {
    size: 10,
  };

  loading = {
    filiais: false,
  };

  postos: Posto[];

  cols = [
    {field: 'id', header: '#'},
    {field: 'cnpj', header: 'CNPJ'},
    {field: 'name', header: 'Nome'},
    {field: 'itau_client_id', header: 'Itaú'},
    {field: 'created_at', header: 'Data'},
  ];


  constructor(
    private router: Router,
    private postosService: PostosService,
    private stateService: StateService,
  ) {
  }

  ngOnInit(): void {
    this.getPostos();
  }

  getPostos() {
    this.loading.filiais = true;
    this.postosService.getPostos().subscribe(
      response => {
        this.loading.filiais = false;
        this.postos = response.data;
      },
      e => {
        console.log(e);
        this.loading.filiais = false;
      }
    );
  }
}
