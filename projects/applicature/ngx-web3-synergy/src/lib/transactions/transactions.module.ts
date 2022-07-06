import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AucSpinnerModule } from '../spinner';
import {
  AucTransactionsHistoryComponent,
  AucTransactionsHistoryModalComponent,
  AucTransactionsListComponent
} from './components';
import { AucIconModule } from '../icon';
import { AucButtonModule } from '../button';
import { AucTransactionService } from './services';


@NgModule({
  declarations: [
    AucTransactionsHistoryComponent,
    AucTransactionsHistoryModalComponent,
    AucTransactionsListComponent
  ],
  exports: [
    AucTransactionsHistoryComponent,
    AucTransactionsHistoryModalComponent,
    AucTransactionsListComponent
  ],
  providers: [AucTransactionService],
  imports: [
    CommonModule,
    HttpClientModule,
    AucSpinnerModule,
    AucIconModule,
    AucButtonModule
  ]
})
export class AucTransactionsModule { }
