import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucFaucetModule } from '@applicature/components';

import { FaucetComponent } from './faucet.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { FaucetRoutingModule } from './faucet-routing.module';
import { BasicFaucetComponent } from './components';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    FaucetComponent,
    BasicFaucetComponent
  ],
  imports: [
    CommonModule,
    FaucetRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    AucFaucetModule
  ]
})
export class FaucetModule {
}
