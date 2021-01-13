import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {UsuariosListarComponent} from './usuarios/listar/usuarios-listar.component';
import {FiliaisListComponent} from './filiais/list/filiais-list.component';
import {FiliaisEditComponent} from './filiais/edit/filiais-edit.component';
import {AtendentesListComponent} from './atendentes/list/atendentes-list.component';
import {AtendentesEditComponent} from './atendentes/edit/atendentes-edit.component';

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
      path: 'filiais/:id',
      component: FiliaisEditComponent,
    },
    {
      path: 'atendentes',
      component: AtendentesListComponent,
    },
    {
      path: 'atendentes/:id',
      component: AtendentesEditComponent,
    },
    {
      path: 'usuarios',
      component: UsuariosListarComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
