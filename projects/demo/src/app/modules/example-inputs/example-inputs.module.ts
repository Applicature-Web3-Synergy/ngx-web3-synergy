import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleInputsComponent } from './example-inputs.component';
import { AucInputModule } from '@applicature/components';



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
