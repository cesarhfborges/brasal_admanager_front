import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {UsuariosListarComponent} from './usuarios/listar/usuarios-listar.component';
import {FiliaisListComponent} from './filiais/list/filiais-list.component';
import {AtendentesListComponent} from './atendentes/list/atendentes-list.component';
import {AdminsListComponent} from './admins/list/admins-list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'filiais',
      component: FiliaisListComponent,
    },
    {
      path: 'atendentes',
      component: AtendentesListComponent,
    },
    {
      path: 'usuarios',
      component: UsuariosListarComponent,
    },
    {
      path: 'admins',
      component: AdminsListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
