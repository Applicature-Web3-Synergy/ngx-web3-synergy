import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AucButtonModule } from '../renamed/button';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { AucDialogModule } from '../renamed/dialog';

@NgModule({
  declarations: [
    TransactionsHistoryComponent,
  ],
  exports: [
    TransactionsHistoryComponent,
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucDialogModule
  ]
})
export class TransactionsHistoryModule {
}
