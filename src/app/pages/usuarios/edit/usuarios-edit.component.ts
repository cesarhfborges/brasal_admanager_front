import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {UsuariosService} from '../../../shared/services/usuarios.service';
import {Usuario} from '../../../shared/models/usuario';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';

@Component({
  selector: 'ngx-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  usuario: Usuario;

  postos: Posto[];

  form: FormGroup;
  loading = {
    usuarios: false,
    postos: false,
  };

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private usuariosService: UsuariosService,
    private postosService: PostosService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      station_id: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.getPostos();
    this.form.patchValue(this.usuario);
  }

  close(): void {
    this.dialogRef.close(null);
  }

  getPostos() {
    this.loading.postos = true;
    this.postosService.getPostosCombo().subscribe(
      response => {
        this.postos = response;
        this.loading.postos = false;
      },
      error => {
        console.log(error);
        this.loading.postos = false;
      }
    );
  }

  onSubmit() {
    this.usuariosService.updateUsuarios(this.usuario.id, this.form.value).subscribe(
      response => {
        this.dialogRef.close({status: true, data: this.form.value});
      },
      error => {
        console.log(error);
      }
    );
  }
}
