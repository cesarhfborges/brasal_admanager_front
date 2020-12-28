import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {LdapUser} from '../../../shared/models/ldap-user';
import {UsuariosService} from '../../../shared/services/usuarios.service';

@Component({
  selector: 'ngx-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  usuario: LdapUser;

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private usuariosService: UsuariosService,
  ) {
    this.form = new FormGroup({
      objectguid: new FormControl(null, [Validators.required]),
      cn: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      givenname: new FormControl(null, [Validators.required]),
      samaccountname: new FormControl(null, [Validators.required]),
      userprincipalname: new FormControl(null, [Validators.required]),
      displayname: new FormControl(null, [Validators.required]),
      distinguishedname: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required]),
      memberof: new FormControl(null, [Validators.required]),
      useraccountcontrol: new FormControl(null, [Validators.required]),
      objectsid: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.usuario);
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.usuariosService.updateUsuarios(this.form.value).subscribe(
      response => {
        console.log(response);
        this.dialogRef.close(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
