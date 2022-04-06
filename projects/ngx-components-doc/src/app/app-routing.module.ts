import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTER_LINKS } from './enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_LINKS.BUTTON,
    pathMatch: 'full'
  },
  {
    path: ROUTER_LINKS.BUTTON,
    loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule)
  },
  {
    path: '**',
    redirectTo: ROUTER_LINKS.BUTTON,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
