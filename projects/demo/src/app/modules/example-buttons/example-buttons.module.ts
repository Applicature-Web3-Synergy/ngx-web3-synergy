import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sButtonModule } from '@applicature/ngx-web3-synergy';

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
    W3sButtonModule
  ]
})
export class ExampleButtonsModule { }
