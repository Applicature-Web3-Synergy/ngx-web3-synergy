import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAvatarModule } from '@applicature/components';

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
