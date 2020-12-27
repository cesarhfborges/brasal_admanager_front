import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {ThemeModule} from '../@theme/theme.module';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {NbAuthModule} from '@nebular/auth';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    CommonModule,
    NbCardModule,
    NbAuthModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
})
export class AuthModule {
}
