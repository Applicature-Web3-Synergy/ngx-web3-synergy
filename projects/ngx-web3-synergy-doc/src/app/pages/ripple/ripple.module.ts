import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sButtonModule, W3RippleModule } from '@applicature/ngx-web3-synergy';

import { RippleRoutingModule } from './ripple-routing.module';
import { RippleComponent } from './ripple.component';
import { BasicRippleComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    RippleComponent,
    BasicRippleComponent,
  ],
  imports: [
    CommonModule,
    RippleRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3RippleModule,
    W3sButtonModule
  ]
})
export class RippleModule { }
