import {NgModule} from '@angular/core';
import {NbCardModule, NbIconModule, NbMenuModule, NbSpinnerModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeComponent} from './home/home.component';
import {UsuariosListarComponent} from './usuarios/listar/usuarios-listar.component';
import {TableModule} from "primeng/table";

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
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UsuariosListarComponent,
  ],
})
export class PagesModule {
}
