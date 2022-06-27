import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/components';

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
