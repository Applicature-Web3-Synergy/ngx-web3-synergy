import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sFaucetComponent } from './faucet.component';
import { W3sButtonModule } from '../button';
import { W3sIconModule } from '../icon';


@NgModule({
  declarations: [
    W3sFaucetComponent
  ],
  exports: [
    W3sFaucetComponent
  ],
  imports: [
    CommonModule,
    W3sButtonModule,
    W3sIconModule
  ]
})
export class W3sFaucetModule { }
