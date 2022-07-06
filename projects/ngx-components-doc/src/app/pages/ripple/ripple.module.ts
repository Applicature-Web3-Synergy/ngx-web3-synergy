import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucRippleModule } from '@applicature/ngx-web3-synergy';

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
    AucRippleModule,
    AucButtonModule
  ]
})
export class RippleModule { }
