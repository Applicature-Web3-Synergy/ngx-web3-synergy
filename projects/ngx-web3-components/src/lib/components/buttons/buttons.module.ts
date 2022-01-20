import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../pipes';
import { AccountBalanceModule } from '../account-balance/account-balance.module';
import { AvatarModule } from '../avatar/avatar.module';
import { AccountPopoverComponent } from './account-popover/account-popover.component';

import { ActionButtonComponent } from './action-button/action-button.component';
import { ConnectWalletButtonComponent } from './connect-wallet-button/connect-wallet-button.component';
import { NetworkDropdownComponent } from './network-dropdown/network-dropdown.component';
import { RecentTransactionsButtonComponent } from './recent-transactions-button/recent-transactions-button.component';

const components = [
  AccountPopoverComponent,
  ActionButtonComponent,
  ConnectWalletButtonComponent,
  NetworkDropdownComponent,
  RecentTransactionsButtonComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    PipesModule,
    AvatarModule,
    ClipboardModule,
    AccountBalanceModule,
    MatDialogModule,
  ]
})
export class ButtonsModule {
}
