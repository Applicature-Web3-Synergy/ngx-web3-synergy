import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAvatarModule } from '@applicature/ngx-web3-synergy';

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
    AucAvatarModule
  ]
})
export class ExampleAvatarsModule { }
