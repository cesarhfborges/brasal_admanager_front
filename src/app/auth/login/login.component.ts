import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      username: new FormControl('cesar@darvsistemas.local', [Validators.required]),
      password: new FormControl('1234', [Validators.required]),
      remember: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        error => {
          this.form.get('password').reset();
          this.toastService.showToastDanger('Não foi possível efetuar login, verifique seu usuário e senha e tente novamente.', 'Atenção');
        }
      );
    } else {
      this.toastService.showToastWarning('Verifique os campos obrigatórios', 'Atenção');
    }
  }
}
