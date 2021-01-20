import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {UsuariosService} from '../../../../shared/services/usuarios.service';
import {Usuario} from '../../../../shared/models/usuario';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
  selector: 'ngx-usuarios-password',
  templateUrl: './usuarios-password.component.html',
  styleUrls: ['./usuarios-password.component.scss']
})
export class UsuariosPasswordComponent implements OnInit {

  form: FormGroup;

  usuario: Usuario;

  loading = {
    usuarios: false,
  };

  showPassword = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private usuariosService: UsuariosService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      confirm_password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.get('password').value === this.form.get('confirm_password').value) {
        this.usuariosService.updatePasswordUsuario(this.usuario.id, this.form.value).subscribe(
          response => {
            this.dialogRef.close({...response});
          }
        );
      } else {
        this.toastService.showToastWarning('As senhas não conferem.', 'Ops');
        this.form.reset();
      }
    } else {
      this.toastService.showToastDanger('Verifique os campos e tente novamente.', 'Ops');
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
