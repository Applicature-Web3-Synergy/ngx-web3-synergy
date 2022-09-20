import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { W3sButtonModule, W3sTransactionsModule } from '@applicature/ngx-web3-synergy';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

import { TransactionsHistoryRoutingModule } from './transactions-history-routing.module';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { BasicTransactionHistoryComponent, CustomTransactionHistoryComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { NeedWalletConnectionModule } from '../../modules/need-wallet-connection';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';



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
    W3sButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class TransactionsHistoryModule {
}
