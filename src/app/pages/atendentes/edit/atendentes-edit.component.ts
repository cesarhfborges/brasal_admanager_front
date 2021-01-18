import {Component, OnInit} from '@angular/core';
import {Location as LocationState} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Atendente} from '../../../shared/models/atendente';
import {PostosService} from '../../../shared/services/postos.service';
import {Posto} from '../../../shared/models/posto';

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

  atendenteAtual: number;
  atendente: Atendente;

  form: FormGroup;

  postos: Posto[];

  constructor(
    private location: LocationState,
    private route: ActivatedRoute,
    private postoServeice: PostosService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      station_id: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getPostos();
    this.atendenteAtual = Number(this.route.snapshot.paramMap.get('id'));
    if (this.atendenteAtual > 0) {
      this.atendente = this.location.getState() as Atendente;
      this.form.patchValue(this.atendente);
      console.log(this.atendente);
    }
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
}
