import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sButtonModule, W3sTransactionsModule } from '@applicature/ngx-web3-synergy';

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
    W3sTransactionsModule,
    W3sButtonModule
  ]
})
export class TransactionsHistoryModule {
}
