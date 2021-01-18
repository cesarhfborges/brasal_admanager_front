import {Component, OnInit} from '@angular/core';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {NbDialogService} from '@nebular/theme';
import {UsuariosEditComponent} from '../edit/usuarios-edit.component';
import {Usuario} from '../../../shared/models/usuario';
import {Pagination} from '../../../shared/models/pagination';

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

  cols = [
    {field: 'id', header: '#', width: '100px', class: 'text-center'},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'username', header: 'Usuário', width: 'auto', class: ''},
    {field: 'email', header: 'E-Mail', width: 'auto', class: ''},
    {field: 'station_id', header: 'Filial', width: '100px', class: 'text-center'},
  ];

  usuarios: Usuario[];

  constructor(
    private usuariosService: UsuariosService,
    private dialogService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.getUsuarios();
    // this.loading = true;
    // this.usuariosService.getUsuarios().subscribe(
    //   response => {
    //     this.loading = false;
    //     this.ldapUsers = response;
    //     console.log(response);
    //   },
    //   error => {
    //     this.loading = false;
    //   }
    // );
  }

  getUsuarios(page: number = 1) {
    this.usuariosService.getUsuarios(page).subscribe(
      response => {
        console.log(response.data);
        this.usuarios = response.data as Usuario[];
        this.pagination = response;
        delete this.pagination['data'];
      }
    );
  }

  parseUrl(page: string): number {
    return Number(page.replace('https://hpix.brasal.com.br/api/sandbox/admin/users?page=', ''))
  }


  editUser(usuario: Usuario) {
    this.dialogService.open(UsuariosEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: true,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        usuario: usuario,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
