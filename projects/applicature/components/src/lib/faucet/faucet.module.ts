import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucFaucetComponent } from './faucet.component';
import { AucButtonModule } from '../button';
import { AucIconModule } from '../icon';


@NgModule({
  declarations: [
    AucFaucetComponent
  ],
  exports: [
    AucFaucetComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucIconModule
  ]
})
export class AucFaucetModule { }
