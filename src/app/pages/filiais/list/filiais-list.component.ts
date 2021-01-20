import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';
import {Pagination} from '../../../shared/models/pagination';
import {NbDialogService} from '@nebular/theme';
import {FiliaisEditComponent} from '../edit/filiais-edit.component';
import {ToastService} from '../../../shared/services/toast.service';
import {environment} from '../../../../environments/environment';

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
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'cnpj', header: 'CNPJ', width: 'auto', class: ''},
  ];


  constructor(
    private router: Router,
    private postosService: PostosService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getPostos(1);
  }

  getPostos(page: number) {
    this.loading.filiais = true;
    this.postosService.getPostos(page).subscribe(
      response => {
        this.loading.filiais = false;
        this.postos = response.data;
        this.pagination = response;
        delete this.pagination['data'];
      },
      error => {
        console.log(error);
        this.loading.filiais = false;
      }
    );
  }

  editarPosto(posto: Posto) {
    this.dialogService.open(FiliaisEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        posto: posto,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          const p = this.postos.find(ps => ps.id = response.id);
          p.name = response.name;
          p.cnpj = response.cnpj;
          p.itau_client_id = response.itau_client_id;
          this.toastService.showToastSuccess('Filial atualizada.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cadastrarPosto() {
    this.dialogService.open(FiliaisEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        posto: null,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          this.toastService.showToastSuccess('Filial Cadastrada.', 'Sucesso');
          this.getPostos(1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace(`${environment.urlApi}/attendants?page=`, ''))
  }
}
