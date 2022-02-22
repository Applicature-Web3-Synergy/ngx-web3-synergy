import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonModule } from '../button/button.module';
import { InputModule } from '../input/input.module';

import { PipesModule } from '../pipes';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { TransactionsHistoryModalComponent } from './transactions-history-modal';
import { TransferModalComponent } from './transfer-modal';
import { WrongNetworkModalComponent } from './wrong-network-modal';

const components = [
  AccountModalComponent,
  TransactionsHistoryModalComponent,
  TransferModalComponent,
  WrongNetworkModalComponent,
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
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    PipesModule,
    MatRippleModule,
    ClipboardModule,
    ButtonModule,
    InputModule,
    MatProgressBarModule,
  ],
})
export class ModalsModule {
}
