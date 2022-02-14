import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TransactionsHistoryComponent } from './transactions-history.component';

@NgModule({
  declarations: [
    TransactionsHistoryComponent,
  ],
  exports: [
    TransactionsHistoryComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ]
})
export class TransactionsHistoryModule {
}
