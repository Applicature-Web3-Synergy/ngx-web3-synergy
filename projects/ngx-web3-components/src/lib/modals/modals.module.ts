import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ButtonsModule } from '../components/buttons';
import { PipesModule } from '../pipes';
import { TransferModalService } from '../services';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { RecentTransactionsModalComponent } from './recent-transactions-modal/recent-transactions-modal.component';
import { WrongNetworkModalComponent } from './wrong-network-modal/wrong-network-modal.component';
import { TransferModalComponent } from './transfer-modal/transfer-modal.component';

const components = [
  AccountModalComponent,
  RecentTransactionsModalComponent,
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
    ButtonsModule,
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    PipesModule,
    MatRippleModule,
    ClipboardModule,
  ],
  providers: [TransferModalService]
})
export class ModalsModule {
}
