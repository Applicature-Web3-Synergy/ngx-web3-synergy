import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AucInputModule } from '@applicature/ngx-web3-synergy';


import { InputRoutingModule } from './input-routing.module';
import { InputComponent } from './input.component';
import { BasicInputComponent, ReactiveFormInputComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    InputComponent,
    BasicInputComponent,
    ReactiveFormInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputRoutingModule,
    AucInputModule,
    ComponentViewerModule,
    ExampleCardModule
  ]
})
export class InputModule {
}
