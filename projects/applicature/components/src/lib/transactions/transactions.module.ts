import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucSpinnerModule } from '../spinner';
import { AucTransactionsListComponent } from './components';
import { AucIconModule } from '../icon';


@NgModule({
  declarations: [
    AucTransactionsListComponent
  ],
  exports: [
    AucTransactionsListComponent
  ],
  imports: [
    CommonModule,
    AucSpinnerModule,
    AucIconModule
  ]
})
export class AucTransactionsModule { }
