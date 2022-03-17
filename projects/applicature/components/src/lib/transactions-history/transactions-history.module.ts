import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AucButtonModule } from '../renamed/button';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { ApplicatureDialogModule } from '../applicature-dialog';

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
    ApplicatureDialogModule
  ]
})
export class TransactionsHistoryModule {
}
