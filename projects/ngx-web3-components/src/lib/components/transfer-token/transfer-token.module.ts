import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PipesModule } from '../../pipes/index';
import { AmountFieldModule } from '../amount-field/amount-field.module';
import { ButtonsModule } from '../buttons/index';
import { TransferTokenComponent } from './transfer-token.component';

@NgModule({
  declarations: [
    TransferTokenComponent
  ],
  imports: [
    CommonModule,
    AmountFieldModule,
    ButtonsModule,
    MatProgressSpinnerModule,
    PipesModule,
    ReactiveFormsModule
  ],
  exports: [
    TransferTokenComponent
  ]
})

export class TransferTokenModule {
}
