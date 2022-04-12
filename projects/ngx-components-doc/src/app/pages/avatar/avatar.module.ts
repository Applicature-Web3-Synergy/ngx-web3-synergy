import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarRoutingModule } from './avatar-routing.module';
import { AvatarComponent } from './avatar.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { BasicAvatarComponent } from './components';
import { AucAvatarModule } from '@applicature/components';


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
