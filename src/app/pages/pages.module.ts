import {NgModule} from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule, NbInputModule,
  NbMenuModule,
  NbSpinnerModule, NbTabsetModule
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeComponent} from './home/home.component';
import {UsuariosListarComponent} from './usuarios/listar/usuarios-listar.component';
import {TableModule} from 'primeng/table';
import { UsuariosEditComponent } from './usuarios/edit/usuarios-edit.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbCardModule,
    NbIconModule,
    TableModule,
    NbSpinnerModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbInputModule,
    NbTabsetModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UsuariosListarComponent,
    UsuariosEditComponent,
  ],
})
export class PagesModule {
}
