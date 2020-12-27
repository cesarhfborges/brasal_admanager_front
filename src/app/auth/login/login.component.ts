import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home']);
        }
      );
    }
  }
}
