import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Atendente} from '../../../shared/models/atendente';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';
import {NbDialogRef} from '@nebular/theme';
import {AtendentesService} from '../../../shared/services/atendentes.service';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'ngx-atendentes-edit',
  templateUrl: './atendentes-edit.component.html',
  styleUrls: ['./atendentes-edit.component.scss']
})
export class AtendentesEditComponent implements OnInit {

  loading = {
    postos: false,
    atendente: false,
  };

  atendente: Atendente;

  form: FormGroup;

  postos: Posto[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private postoServeice: PostosService,
    private atendentesService: AtendentesService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      station_id: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getPostos();
    if (this.atendente) {
      this.form.patchValue(this.atendente);
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  getPostos() {
    this.loading.postos = true;
    this.postoServeice.getPostosCombo().subscribe(
      response => {
        this.postos = response;
        this.loading.postos = false;
      },
      error => {
        this.loading.postos = false;
      }
    );
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.atendente) {
        this.atendentesService.updateAtendentes(this.atendente.id, this.form.value).subscribe(
          response => {
            this.dialogRef.close({...this.form.value, id: this.atendente.id});
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.atendentesService.createAtendentes(this.form.value).subscribe(
          response => {
            this.dialogRef.close({...this.form.value});
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      this.toastService.showToastDanger('Verifique os campos e tente novamente.', 'Ops')
    }
  }
}
