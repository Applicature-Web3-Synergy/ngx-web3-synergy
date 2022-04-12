import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AucAccountBalanceModule, AucConnectWalletModule } from '@applicature/components';

import { AccountBalanceRoutingModule } from './account-balance-routing.module';
import { AccountBalanceComponent } from './account-balance.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicAccountBalanceComponent, CustomizedAccountBalanceComponent } from './components';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';


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
    AucConnectWalletModule,
    AucAccountBalanceModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class AccountBalanceModule { }
