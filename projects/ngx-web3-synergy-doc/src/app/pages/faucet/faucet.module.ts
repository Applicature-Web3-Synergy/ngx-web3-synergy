import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sFaucetModule } from '@applicature/ngx-web3-synergy';
import { MatTabsModule } from '@angular/material/tabs';

import { FaucetComponent } from './faucet.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { FaucetRoutingModule } from './faucet-routing.module';
import { BasicFaucetComponent } from './components';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';


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
    W3sFaucetModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class FaucetModule {
}
