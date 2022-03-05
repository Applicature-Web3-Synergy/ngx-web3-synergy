import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { ApplicatureProgressBarModule } from '../applicature-progress-bar';
import { ApplicatureRippleModule } from '../applicature-ripple';
import { ApplicatureSpinnerModule } from '../applicature-spinner';
import { ButtonModule } from '../button/button.module';
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
    ButtonModule,
    InputModule,
    ApplicatureRippleModule,
    ApplicatureSpinnerModule,
    ApplicatureProgressBarModule,
    ClipboardModule
  ]
})
export class ModalsModule {
}
