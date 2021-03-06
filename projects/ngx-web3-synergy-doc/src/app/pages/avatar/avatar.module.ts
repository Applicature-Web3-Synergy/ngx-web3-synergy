import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAvatarModule } from '@applicature/ngx-web3-synergy';

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
    W3sAvatarModule
  ]
})
export class AvatarModule { }
