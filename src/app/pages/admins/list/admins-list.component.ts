import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {ConfirmationService} from 'primeng/api';
import {AdminsService} from '../../../shared/services/admins.service';
import {Usuario} from '../../../shared/models/usuario';
import {ToastService} from '../../../shared/services/toast.service';
import {AdminsEditComponent} from '../edit/admins-edit.component';

@Component({
  selector: 'ngx-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {

  admins: Usuario[];

  loading = {
    admins: false,
  };

  cols = [
    {field: 'id', header: '#', width: '100px', class: 'text-center'},
    {field: 'name', header: 'Nome', width: 'auto', class: ''},
    {field: 'username', header: 'Usuário', width: 'auto', class: ''},
    {field: 'email', header: 'E-Mail', width: 'auto', class: ''},
  ];

  constructor(
    private adminsService: AdminsService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.loading.admins = true;
    this.adminsService.getAdmins().subscribe(
      response => {
        console.log(response);
        this.admins = response;
        this.loading.admins = false;
      },
      error => {
        console.log(error);
        this.loading.admins = false;
      }
    );
  }

  createAdmin() {
    this.dialogService.open(AdminsEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        admin: null,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          this.getAdmins();
          this.toastService.showToastSuccess('Usuário Cadastrado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editAdmin(admin) {
    this.dialogService.open(AdminsEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        admin: admin,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe(
      (response) => {
        if (response) {
          const adm = this.admins.find(ps => ps.id === response.id);
          adm.name = response.name;
          adm.username = response.username;
          adm.email = response.email;
          this.toastService.showToastSuccess('Usuário atualizado.', 'Sucesso');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAdmin(rowData: any) {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Atenção',
      message: 'Deseja realmente remover este usuario? <br>esta ação não poderá ser defeita.',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.loading.admins = true;
        this.adminsService.deleteAdmin(rowData).subscribe(
          response => {
            const adm = this.admins.findIndex(ad => ad.id === rowData.id);
            delete this.admins[adm];
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
