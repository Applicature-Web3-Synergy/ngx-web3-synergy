import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sIconModule } from '@applicature/ngx-web3-synergy';

import { CardComponent } from './card.component';
import { CardHelperService } from './services';

@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ],
  providers: [
    CardHelperService
  ],
  imports: [
    CommonModule,
    W3sIconModule
  ]
})
export class CardModule { }
