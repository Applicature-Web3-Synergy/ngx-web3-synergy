import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucInputModule } from '@applicature/ngx-web3-synergy';

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
    AucInputModule
  ]
})
export class ExampleInputsModule { }
