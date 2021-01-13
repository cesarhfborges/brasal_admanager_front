import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {NotFoundComponent} from './pages/miscellaneous/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
  },
  {
    path: 'error',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/error'
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
