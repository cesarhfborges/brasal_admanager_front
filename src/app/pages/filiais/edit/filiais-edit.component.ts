import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location as LocationState} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../../../@core/utils';
import {Posto} from '../../../shared/models/posto';

@Component({
  selector: 'ngx-filiais-edit',
  templateUrl: './filiais-edit.component.html',
  styleUrls: ['./filiais-edit.component.scss']
})
export class FiliaisEditComponent implements OnInit {

  postoAtual = null;
  posto: Posto;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private activatedroute: ActivatedRoute,
    private location: LocationState,
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
    this.postoAtual = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postoAtual > 0) {
      this.posto = this.location.getState() as Posto;
      this.form.patchValue(this.posto);
      console.log(this.posto);
    }
  }
}
