import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {Posto} from '../../../shared/models/posto';
import {PostosService} from '../../../shared/services/postos.service';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'ngx-filiais-edit',
  templateUrl: './filiais-edit.component.html',
  styleUrls: ['./filiais-edit.component.scss']
})
export class FiliaisEditComponent implements OnInit {

  posto: Posto;

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private postosService: PostosService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      itau_client_id: new FormControl(null, [Validators.required]),
      created_at: new FormControl(null, []),
      updated_at: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    if (this.posto) {
      this.form.patchValue(this.posto);
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.posto) {
        this.postosService.updatePosto(this.posto.id, this.form.value).subscribe(
          response => {
            this.dialogRef.close({...this.form.value, id: this.posto.id});
          },
          error => {
            console.log(error);
            this.toastService.showToastDanger('Não foi possivel atualizar, tente novamente mais tarde.', 'Ops')
          }
        );
      } else {
        this.postosService.createPosto(this.form.value).subscribe(
          response => {
            this.dialogRef.close({...this.form.value});
          },
          error => {
            console.log(error);
            this.toastService.showToastDanger('Não foi possivel atualizar, tente novamente mais tarde.', 'Ops')
          }
        );
      }
    } else {
      this.toastService.showToastDanger('Verifique os campos e tente novamente.', 'Ops')
    }
  }
}
