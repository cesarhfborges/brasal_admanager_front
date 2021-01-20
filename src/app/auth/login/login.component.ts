import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
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
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('inputUsuario') inputUsr: ElementRef;

  loading: boolean = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      remember: new FormControl(true, [Validators.required]),
    });
    if (!environment.production) {
      this.form.patchValue({username: 'sandbox21', password: '%h3qT$VX5t'});
    }
  }

  ngOnInit(): void {
    // console.log(this.inputUsr);
  }

  ngAfterViewInit(): void {
    this.inputUsr.nativeElement.focus();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(this.form.value).subscribe(
        response => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        e => {
          this.loading = false;
          this.inputUsr.nativeElement.focus();
          if (environment.production) {
            this.form.get('password').reset();
          }
          this.toastService.showToastDanger(e.error, 'Atenção');
        }
      );
    } else {
      this.toastService.showToastWarning('Verifique os campos obrigatórios', 'Atenção');
    }
  }
}
