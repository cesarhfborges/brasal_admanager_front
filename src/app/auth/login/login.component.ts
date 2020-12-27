import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      username: new FormControl('cesar@darvsistemas.local', [Validators.required]),
      password: new FormControl('1234', [Validators.required]),
      remember: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

}
