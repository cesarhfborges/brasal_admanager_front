import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/services/toast.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('inputUsuario') inputUsr: ElementRef;

  loading: boolean = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      username: new FormControl('chborges@brasal.com.br', [Validators.required]),
      password: new FormControl('@Dj91344356', [Validators.required]),
      remember: new FormControl(true, [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.inputUsuario.nativeElement.focus();
    // console.log(this.inputUsr);
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(this.form.value).subscribe(
        response => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
          this.inputUsr.nativeElement.focus();
          if (environment.production) {
            this.form.get('password').reset();
          }
          this.toastService.showToastDanger(error.message, 'Atenção');
        }
      );
    } else {
      this.toastService.showToastWarning('Verifique os campos obrigatórios', 'Atenção');
    }
  }
}
