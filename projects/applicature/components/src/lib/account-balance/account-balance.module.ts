import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucPipesModule } from '../pipes';
import { AucAccountBalanceComponent } from './account-balance.component';
import { AucIconModule } from '../icon';
import { AucButtonModule } from '../button';
import { AucDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    AucAccountBalanceComponent,
  ],
  exports: [
    AucAccountBalanceComponent,
  ],
  imports: [
    CommonModule,
    AucPipesModule,
    AucIconModule,
    AucButtonModule,
    AucDirectivesModule,
  ]
})
export class AucAccountBalanceModule {
}
