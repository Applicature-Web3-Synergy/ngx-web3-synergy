import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectWalletComponent } from './connect-wallet.component';

const routes: Routes = [ {
  path: '',
  component: ConnectWalletComponent
} ];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConnectWalletRoutingModule {
}
