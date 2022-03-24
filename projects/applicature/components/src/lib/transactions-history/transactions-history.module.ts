import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '../button';
import { AucDialogModule } from '../dialog';
import { AucTransactionsHistoryComponent } from './transactions-history.component';

@NgModule({
  declarations: [
    AucTransactionsHistoryComponent,
  ],
  exports: [
    AucTransactionsHistoryComponent,
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucDialogModule
  ]
})
export class AucTransactionsHistoryModule {
}
