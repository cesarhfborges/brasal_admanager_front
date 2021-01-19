import {NgModule} from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule, NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,
    NbSpinnerModule,
    NbTabsetModule
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeComponent} from './home/home.component';
import {UsuariosListarComponent} from './usuarios/listar/usuarios-listar.component';
import {TableModule} from 'primeng/table';
import {UsuariosEditComponent} from './usuarios/edit/usuarios-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule as BrSharedModule} from '../shared/shared.module';
import {FiliaisListComponent} from './filiais/list/filiais-list.component';
import {FiliaisEditComponent} from './filiais/edit/filiais-edit.component';
import { AtendentesListComponent } from './atendentes/list/atendentes-list.component';
import { AtendentesEditComponent } from './atendentes/edit/atendentes-edit.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaskModule} from "ngx-mask";
import { UsuariosPasswordComponent } from './usuarios/password/usuarios-password/usuarios-password.component';

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
        BrSharedModule,
        NgSelectModule,
        NbFormFieldModule,
        NgxMaskModule
    ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UsuariosListarComponent,
    UsuariosEditComponent,
    FiliaisListComponent,
    FiliaisEditComponent,
    AtendentesListComponent,
    AtendentesEditComponent,
    UsuariosPasswordComponent,
  ],
})
export class PagesModule {
}
