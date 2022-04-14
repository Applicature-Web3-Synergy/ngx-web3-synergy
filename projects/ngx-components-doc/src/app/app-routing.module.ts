import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTER_LINKS } from './enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_LINKS.CONNECT_WALLET,
    pathMatch: 'full'
  },
  {
    path: ROUTER_LINKS.CONNECT_WALLET,
    loadChildren: () => import('./pages/connect-wallet/connect-wallet.module').then(m => m.ConnectWalletModule)
  },
  {
    path: ROUTER_LINKS.BUTTON,
    loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule)
  },
  {
    path: ROUTER_LINKS.ACCOUNT_BALANCE,
    loadChildren: () => import('./pages/account-balance/account-balance.module').then(m => m.AccountBalanceModule)
  },
  {
    path: ROUTER_LINKS.ACCOUNT_BUTTON,
    loadChildren: () => import('./pages/account-button/account-button.module').then(m => m.AccountButtonModule)
  },
  {
    path: ROUTER_LINKS.ALERT,
    loadChildren: () => import('./pages/alert/alert.module').then(m => m.AlertModule)
  },
  {
    path: ROUTER_LINKS.AVATAR,
    loadChildren: () => import('./pages/avatar/avatar.module').then(m => m.AvatarModule)
  },
  {
    path: ROUTER_LINKS.TRANSACTION_HISTORY,
    loadChildren: () => import('./pages/transactions-history/transactions-history.module')
      .then(m => m.TransactionsHistoryModule)
  },
  {
    path: ROUTER_LINKS.TABLE,
    loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule)
  },
  {
    path: ROUTER_LINKS.DIALOG,
    loadChildren: () => import('./pages/dialog/dialog.module').then(m => m.DialogModule)
  },
  {
    path: ROUTER_LINKS.NETWORK_DROPDOWN,
    loadChildren: () => import('./pages/network-dropdown/network-dropdown.module').then(m => m.NetworkDropdownModule)
  },
  {
    path: ROUTER_LINKS.COPY_TO_CLIPBOARD,
    loadChildren: () => import('./pages/copy-to-clipboard/copy-to-clipboard.module').then(m => m.CopyToClipboardModule)
  },
  {
    path: ROUTER_LINKS.DROPDOWN,
    loadChildren: () => import('./pages/dropdown/dropdown.module').then(m => m.DropdownModule)
  },
  {
    path: ROUTER_LINKS.ICON,
    loadChildren: () => import('./pages/icon/icon.module').then(m => m.IconModule)
  },
  {
    path: '**',
    redirectTo: ROUTER_LINKS.CONNECT_WALLET,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
