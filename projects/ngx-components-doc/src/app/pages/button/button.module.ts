import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/components';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';


@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonRoutingModule,
    ComponentViewerModule,
    AucButtonModule
  ]
})
export class ButtonModule { }
