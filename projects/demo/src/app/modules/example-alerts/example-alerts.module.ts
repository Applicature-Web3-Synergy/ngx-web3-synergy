import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAlertModule } from '@applicature/ngx-web3-synergy';

import { ExampleAlertsComponent } from './example-alerts.component';


@NgModule({
  declarations: [
    ExampleAlertsComponent
  ],
  exports: [
    ExampleAlertsComponent
  ],
  imports: [
    CommonModule,
    W3sAlertModule
  ]
})
export class ExampleAlertsModule { }
