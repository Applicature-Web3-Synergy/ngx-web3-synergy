import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PipesModule } from '../../../pipes';
import { TransactionService, WalletService } from '../../../services';
import { AccountBalanceModule } from '../../account-balance/account-balance.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { AccountPopoverComponent } from '../account-popover/account-popover.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { NetworkDropdownComponent } from '../network-dropdown/network-dropdown.component';
import { RecentTransactionsButtonComponent } from '../recent-transactions-button/recent-transactions-button.component';
import { ConnectWalletButtonComponent } from './connect-wallet-button.component';

export default {
  title: 'components/Buttons/Connect Wallet',
  component: ConnectWalletButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        AccountPopoverComponent,
        ActionButtonComponent,
        ConnectWalletButtonComponent,
        NetworkDropdownComponent,
        RecentTransactionsButtonComponent,
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
        HttpClientModule,
      ],
      providers: [
        WalletService,
        TransactionService,
      ],
    }),
  ],
} as Meta;

const Template: Story<ConnectWalletButtonComponent> = (args: ConnectWalletButtonComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  networkOptions: [
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Ethereum',
      chainId: '0x1',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Kovan',
      chainId: '0x2a',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/bsc.svg',
      name: 'BSC',
      chainId: '0x38',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/polygon.svg',
      name: 'Polygon',
      chainId: '0x89',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/avax.svg',
      name: 'Avalanche',
      chainId: '0xa86a',
      isActive: false,
    },
  ],
};
