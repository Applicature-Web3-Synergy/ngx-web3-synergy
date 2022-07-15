import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { W3SpinnerModule } from '../spinner';
import {
  W3sTransactionsHistoryComponent,
  W3sTransactionsHistoryModalComponent,
  W3sTransactionsListComponent
} from './components';
import { W3sIconModule } from '../icon';
import { W3sButtonModule } from '../button';


@NgModule({
  declarations: [
    W3sTransactionsHistoryComponent,
    W3sTransactionsHistoryModalComponent,
    W3sTransactionsListComponent
  ],
  exports: [
    W3sTransactionsHistoryComponent,
    W3sTransactionsHistoryModalComponent,
    W3sTransactionsListComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    HttpClientModule,
    W3SpinnerModule,
    W3sIconModule,
    W3sButtonModule
  ]
})
export class W3sTransactionsModule { }
