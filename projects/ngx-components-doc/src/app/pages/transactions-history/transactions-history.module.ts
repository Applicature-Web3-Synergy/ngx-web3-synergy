import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucTransactionsModule } from '@applicature/components';

import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { BasicTransactionHistoryComponent, CustomTransactionHistoryComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { NeedWalletConnectionModule } from '../../modules/need-wallet-connection';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    TransactionsHistoryComponent,
    BasicTransactionHistoryComponent,
    CustomTransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    TransactionsHistoryRoutingModule,
    ComponentViewerModule,
    NeedWalletConnectionModule,
    ExampleCardModule,
    AucTransactionsModule,
    AucButtonModule
  ]
})
export class TransactionsHistoryModule {
}
