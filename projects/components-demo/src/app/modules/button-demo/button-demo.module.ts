import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDemoComponent } from './button-demo.component';
import { ExampleViewModule } from '../example-view/example-view.module';
import { AucButtonModule } from '@applicature/components';



@NgModule({
  declarations: [
    ButtonDemoComponent
  ],
  exports: [
    ButtonDemoComponent
  ],
  imports: [
    CommonModule,
    ExampleViewModule,
    AucButtonModule
  ]
})
export class ButtonDemoModule { }
