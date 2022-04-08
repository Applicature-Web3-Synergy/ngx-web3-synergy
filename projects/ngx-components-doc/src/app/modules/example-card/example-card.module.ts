import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleCardComponent } from './example-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeExampleModule } from '../code-example/code-example.module';


@NgModule({
  declarations: [
    ExampleCardComponent
  ],
  exports: [
    ExampleCardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    CodeExampleModule
  ]
})
export class ExampleCardModule {
}
