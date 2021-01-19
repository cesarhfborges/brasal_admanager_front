import {Component, OnInit} from '@angular/core';
import {AtendentesService} from '../../../shared/services/atendentes.service';
import {NbDialogService} from '@nebular/theme';
import {Atendente} from '../../../shared/models/atendente';
import {Pagination} from '../../../shared/models/pagination';
import {AtendentesEditComponent} from '../edit/atendentes-edit.component';
import {ToastService} from '../../../shared/services/toast.service';
import {PostosService} from '../../../shared/services/postos.service';

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
          console.log(response);
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
          this.getAtendentes();
          this.toastService.showToastSuccess('Atendente atualizado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace('https://hpix.brasal.com.br/api/sandbox/admin/attendants?page=', ''))
  }

  getPostos() {
    this.postosService.getPostosCombo().subscribe(
      response => {
        this.postos = response;
        this.getAtendentes();
      }
    );
  }

  getPostoInfo(id: number): string {
    return this.postos ? this.postos.find(p => p.id === id).name : 'Carregando';
  }
}
