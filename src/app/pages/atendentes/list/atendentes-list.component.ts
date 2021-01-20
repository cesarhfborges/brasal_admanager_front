import {Component, OnInit} from '@angular/core';
import {AtendentesService} from '../../../shared/services/atendentes.service';
import {NbDialogService} from '@nebular/theme';
import {Atendente} from '../../../shared/models/atendente';
import {Pagination} from '../../../shared/models/pagination';
import {AtendentesEditComponent} from '../edit/atendentes-edit.component';
import {ToastService} from '../../../shared/services/toast.service';
import {PostosService} from '../../../shared/services/postos.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-atendentes-list',
  templateUrl: './atendentes-list.component.html',
  styleUrls: ['./atendentes-list.component.scss']
})
export class AtendentesListComponent implements OnInit {

  atendentes: Atendente[];
  postos: any;

  pagination: Pagination;

  loading = {
    filiais: false,
    atendentes: false,
  };

  filter = {
    limit: 15,
    orderBy: 'name',
    station: null,
  }

  cols = [
    {field: 'id', header: '#', width: '160px', class: 'text-center'},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'station_id', header: 'Filial', width: '220px', class: ''},
  ];

  constructor(
    private postosService: PostosService,
    private atendentesService: AtendentesService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getPostos();
  }

  getAtendentes(pag: number) {
    this.atendentesService.getAtendentes({page: pag, limit: this.filter.limit, sort: this.filter.orderBy, station: this.filter.station}).subscribe(
      response => {
        // @ts-ignore
        this.atendentes = response.data;
        this.pagination = response;
        delete this.pagination['data'];
      }
    );
  }

  editarAtendente(atendente: Atendente) {
    this.dialogService.open(AtendentesEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        atendente: atendente,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          const p = this.atendentes.find(ps => ps.id = response.id);
          p.name = response.name;
          p.station_id = response.station_id;
          this.toastService.showToastSuccess('Atendente atualizado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cadastrarAtendente() {
    this.dialogService.open(AtendentesEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        atendente: null,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          this.getAtendentes(1);
          this.toastService.showToastSuccess('Atendente atualizado.', 'Sucesso');
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

  getPostos() {
    this.loading.filiais = true;
    this.postosService.getPostosCombo().subscribe(
      response => {
        this.postos = response;
        this.loading.filiais = false;
        this.getAtendentes(1);
      },
      error => {
        this.loading.filiais = false;
      }
    );
  }

  getPostoInfo(id: number): string {
    return this.postos ? this.postos.find(p => p.id === id).name : 'Carregando';
  }
}
