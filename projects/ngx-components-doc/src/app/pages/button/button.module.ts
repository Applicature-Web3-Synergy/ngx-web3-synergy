import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/components';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicButtonsComponent } from './components';
import { IconButtonsComponent } from './components/icon-buttons/icon-buttons.component';
import { ButtonsWithIconComponent } from './components/buttons-with-icon/buttons-with-icon.component';
import { ButtonsWithIdenticonComponent } from './components/buttons-with-identicon/buttons-with-identicon.component';
import { ButtonsCustomSizeComponent } from './components/buttons-custom-size/buttons-custom-size.component';


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
export class ButtonModule { }
