import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  loading: boolean = false;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {}
}
