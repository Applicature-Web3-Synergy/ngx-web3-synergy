import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAccountButtonModule } from '@applicature/ngx-web3-synergy';
import { MatTabsModule } from '@angular/material/tabs';

import { AccountButtonRoutingModule } from './account-button-routing.module';
import { AccountButtonComponent } from './account-button.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicAccountButtonComponent } from './components';
import { NeedWalletConnectionModule } from '../../modules/need-wallet-connection';
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';

@NgModule({
  declarations: [
    AccountButtonComponent,
    BasicAccountButtonComponent
  ],
  imports: [
    CommonModule,
    AccountButtonRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sAccountButtonModule,
    NeedWalletConnectionModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class AccountButtonModule { }
