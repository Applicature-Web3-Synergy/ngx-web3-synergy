import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sPipesModule } from '../pipes';
import { W3sAccountBalanceComponent } from './account-balance.component';
import { W3sIconModule } from '../icon';
import { W3sButtonModule } from '../button';
import { W3sDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    W3sAccountBalanceComponent,
  ],
  exports: [
    W3sAccountBalanceComponent,
  ],
  imports: [
    CommonModule,
    W3sPipesModule,
    W3sIconModule,
    W3sButtonModule,
    W3sDirectivesModule,
  ]
})
export class W3sAccountBalanceModule {
}
