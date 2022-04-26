import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAvatarModule } from '@applicature/components';

import { AvatarRoutingModule } from './avatar-routing.module';
import { AvatarComponent } from './avatar.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicAvatarComponent } from './components';


@NgModule({
  declarations: [
    AvatarComponent,
    BasicAvatarComponent
  ],
  imports: [
    CommonModule,
    AvatarRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    AucAvatarModule
  ]
})
export class AvatarModule { }
