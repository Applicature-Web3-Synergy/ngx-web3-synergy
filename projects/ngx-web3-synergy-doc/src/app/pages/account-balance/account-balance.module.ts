import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { W3sAccountBalanceModule, W3sConnectWalletModule } from '@applicature/ngx-web3-synergy';

import { AccountBalanceRoutingModule } from './account-balance-routing.module';
import { AccountBalanceComponent } from './account-balance.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { NeedWalletConnectionModule } from '../../modules/need-wallet-connection';
import { BasicAccountBalanceComponent, CustomizedAccountBalanceComponent } from './components';


@NgModule({
  declarations: [
    AccountBalanceComponent,
    BasicAccountBalanceComponent,
    CustomizedAccountBalanceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountBalanceRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sConnectWalletModule,
    W3sAccountBalanceModule,
    MatCheckboxModule,
    MatSelectModule,
    NeedWalletConnectionModule
  ]
})
export class AccountBalanceModule { }
