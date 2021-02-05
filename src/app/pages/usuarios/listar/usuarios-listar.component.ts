import {Component, OnInit} from '@angular/core';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {NbDialogService} from '@nebular/theme';
import {UsuariosEditComponent} from '../edit/usuarios-edit.component';
import {Usuario} from '../../../shared/models/usuario';
import {Pagination} from '../../../shared/models/pagination';
import {ToastService} from '../../../shared/services/toast.service';
import {UsuariosPasswordComponent} from '../password/usuarios-password/usuarios-password.component';
import {PostosService} from '../../../shared/services/postos.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.scss']
})
export class UsuariosListarComponent implements OnInit {

  loading = {
    usuarios: false,
  };

  pagination: Pagination;
  postos: any;

  cols = [
    {field: 'id', header: '#', width: '100px', class: 'text-center'},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'username', header: 'Usuário', width: 'auto', class: ''},
    {field: 'email', header: 'E-Mail', width: 'auto', class: ''},
    {field: 'station_id', header: 'Filial', width: '260px', class: ''},
  ];

  usuarios: Usuario[];

  constructor(
    private postosService: PostosService,
    private usuariosService: UsuariosService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getPostos();
  }

  getPostos() {
    this.postosService.getPostosCombo().subscribe(
      response => {
        this.postos = response;
        this.getUsuarios();
      }
    );
  }

  getUsuarios(page: number = 1) {
    this.usuariosService.getUsuarios(page).subscribe(
      response => {
        this.usuarios = response.data as Usuario[];
        this.pagination = response;
        delete this.pagination['data'];
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace(`${environment.urlApi}/attendants?page=`, ''))
  }

  getPostoInfo(id: number): string {
    return this.postos ? this.postos.find(p => p.id === id).name : 'Carregando';
  }

  editUser(usuario: Usuario) {
    this.dialogService.open(UsuariosEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        usuario: usuario,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          const p = this.usuarios.find(ps => ps.id === response.id);
          p.name = response.name;
          p.username = response.username;
          p.email = response.email;
          p.station_id = response.station_id;
          this.toastService.showToastSuccess('Usuário atualizado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  createUser() {
    this.dialogService.open(UsuariosEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        usuario: null,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          this.getUsuarios();
          this.toastService.showToastSuccess('Usuário Cadastrado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  changeUserPassword(usuario: Usuario) {
    this.dialogService.open(UsuariosPasswordComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        usuario: usuario,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          this.toastService.showToastSuccess('Senha alterada.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
