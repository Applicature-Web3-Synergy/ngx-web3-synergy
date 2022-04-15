import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShortAddressComponent } from './short-address.component';

const routes: Routes = [
  {
    path: '',
    component: ShortAddressComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ShortAddressRoutingModule {
}
