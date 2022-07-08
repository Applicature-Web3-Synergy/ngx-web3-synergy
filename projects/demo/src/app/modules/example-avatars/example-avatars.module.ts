import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAvatarModule } from '@applicature/ngx-web3-synergy';

import { ExampleAvatarsComponent } from './example-avatars.component';


@NgModule({
  declarations: [
    ExampleAvatarsComponent
  ],
  exports: [
    ExampleAvatarsComponent
  ],
  imports: [
    CommonModule,
    W3sAvatarModule
  ]
})
export class ExampleAvatarsModule { }
