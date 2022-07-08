import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAlertModule } from '@applicature/ngx-web3-synergy';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicAlertComponent } from './components';


@NgModule({
  declarations: [
    AlertComponent,
    BasicAlertComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sAlertModule
  ]
})
export class AlertModule {
}
