import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucSpinnerModule } from '@applicature/ngx-web3-synergy';

import { SpinnerRoutingModule } from './spinner-routing.module';
import { SpinnerComponent } from './spinner.component';
import { BasicSpinnerComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    SpinnerComponent,
    BasicSpinnerComponent
  ],
  imports: [
    CommonModule,
    SpinnerRoutingModule,
    AucSpinnerModule,
    ComponentViewerModule,
    ExampleCardModule
  ]
})
export class SpinnerModule {
}
