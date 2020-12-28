import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {LdapUser} from '../../../shared/models/ldap-user';
import {NbDialogService} from '@nebular/theme';
import {UsuariosEditComponent} from '../edit/usuarios-edit.component';

@Component({
  selector: 'ngx-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.scss']
})
export class UsuariosListarComponent implements OnInit {

  loading = false;

  ldapUsers: LdapUser[];

  products: any = [
    {
      code: 'asdfasdf',
      name: 'adsfasdf',
      category: 'asdf',
      quantity: 'asdfasdfasdf',
    }
  ];

  constructor(
    private usuariosService: UsuariosService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.loading = false;
        this.ldapUsers = response;
        console.log(response);
      },
      error => {
        this.loading = false;
      }
    );
  }

  getStatusMessages(status): string {
    switch (status[0]) {
      case '512':
        return 'Conta desabilitada';
      case '514':
        return 'Conta desabilitada';
      case '544':
        return 'Conta habilitada, senha não requerida';
      case '546':
        return 'Conta desabilitada, senha não requerida';
      case '66048':
        return 'Conta habilitada, senha não expira';
      case '66050':
        return 'Conta desabilitada, senha não expira';
      case '66080':
        return 'Conta habilitada, Senha não expira e não é requerida';
      case '66082':
        return 'Conta desabilitada, Senha não expira e não é requerida';
      default:
        return 'Error';
    }
  }

  editUser(usuario: LdapUser) {
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
