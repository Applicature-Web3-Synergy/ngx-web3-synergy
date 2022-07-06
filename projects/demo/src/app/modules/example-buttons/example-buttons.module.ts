import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/ngx-web3-synergy';

import { ExampleButtonsComponent } from './example-buttons.component';


@NgModule({
  declarations: [
    ExampleButtonsComponent
  ],
  exports: [
    ExampleButtonsComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule
  ]
})
export class ExampleButtonsModule { }
