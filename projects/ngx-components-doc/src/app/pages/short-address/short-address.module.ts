import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucPipesModule } from '@applicature/components';

import { ShortAddressRoutingModule } from './short-address-routing.module';
import { ShortAddressComponent } from './short-address.component';
import { BasicShortAddressComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    ShortAddressComponent,
    BasicShortAddressComponent
  ],
  imports: [
    CommonModule,
    ShortAddressRoutingModule,
    AucPipesModule,
    ComponentViewerModule,
    ExampleCardModule
  ]
})
export class ShortAddressModule {
}
