import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { W3sProgressBarModule } from '../progress-bar';
import { W3RippleModule } from '../ripple';
import { W3SpinnerModule } from '../spinner';
import { W3sButtonModule } from '../button';
import { W3sInputModule } from '../input';
import { W3sPipesModule } from '../pipes';
import { W3sAccountModalComponent } from './account-modal';
import { W3sTransferModalComponent } from './transfer-modal';
import { W3sWrongNetworkModalComponent } from './wrong-network-modal';
import { W3sIconModule } from '../icon';
import { W3sDirectivesModule } from '../directives';
import { W3sTransactionsModule } from '../transactions';
import { W3sCopyToClipboardModule } from '../copy-to-clipboard';

const components = [
  W3sAccountModalComponent,
  W3sTransferModalComponent,
  W3sWrongNetworkModalComponent
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
    W3sPipesModule,
    W3sButtonModule,
    W3sInputModule,
    W3RippleModule,
    W3SpinnerModule,
    W3sProgressBarModule,
    W3sIconModule,
    W3sDirectivesModule,
    W3sTransactionsModule,
    W3sCopyToClipboardModule
  ]
})
export class W3sModalsModule {
}
