import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AucProgressBarModule } from '../renamed/progress-bar';
import { AucRippleModule } from '../renamed/ripple';
import { AucSpinnerModule } from '../renamed/spinner';
import { AucButtonModule } from '../renamed/button';
import { InputModule } from '../input/input.module';
import { PipesModule } from '../pipes';
import { AccountModalComponent } from './account-modal';
import { TransactionsHistoryModalComponent } from './transactions-history-modal';
import { TransferModalComponent } from './transfer-modal';
import { WrongNetworkModalComponent } from './wrong-network-modal';

const components = [
  AccountModalComponent,
  TransactionsHistoryModalComponent,
  TransferModalComponent,
  WrongNetworkModalComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    AucButtonModule,
    InputModule,
    AucRippleModule,
    AucSpinnerModule,
    AucProgressBarModule,
    ClipboardModule
  ]
})
export class ModalsModule {
}
