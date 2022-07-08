import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sInputModule } from '@applicature/ngx-web3-synergy';

import { ExampleInputsComponent } from './example-inputs.component';



@NgModule({
  declarations: [
    ExampleInputsComponent
  ],
  exports: [
    ExampleInputsComponent
  ],
  imports: [
    CommonModule,
    W3sInputModule
  ]
})
export class ExampleInputsModule { }
