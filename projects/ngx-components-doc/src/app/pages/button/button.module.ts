import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/ngx-web3-synergy';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import {
  BasicButtonsComponent,
  ButtonsCustomSizeComponent,
  ButtonsWithIconComponent,
  ButtonsWithIdenticonComponent,
  IconButtonsComponent
} from './components';


@NgModule({
  declarations: [
    ButtonComponent,
    BasicButtonsComponent,
    IconButtonsComponent,
    ButtonsWithIconComponent,
    ButtonsWithIdenticonComponent,
    ButtonsCustomSizeComponent
  ],
  exports: [
    BasicButtonsComponent
  ],
  imports: [
    CommonModule,
    ButtonRoutingModule,
    ComponentViewerModule,
    AucButtonModule,
    ExampleCardModule
  ]
})
export class ButtonModule {
}
