import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RippleComponent } from './ripple.component';

const routes: Routes = [
  {
    path: '',
    component: RippleComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RippleRoutingModule {
}
