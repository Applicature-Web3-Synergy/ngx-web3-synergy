import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sIconModule } from '@applicature/ngx-web3-synergy';

import { IconRoutingModule } from './icon-routing.module';
import { IconComponent } from './icon.component';
import { BasicIconsComponent, CustomizedIconsComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    IconComponent,
    BasicIconsComponent,
    CustomizedIconsComponent
  ],
  imports: [
    CommonModule,
    IconRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sIconModule
  ]
})
export class IconModule {
}
