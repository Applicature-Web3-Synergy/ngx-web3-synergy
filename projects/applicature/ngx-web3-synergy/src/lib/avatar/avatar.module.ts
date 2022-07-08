import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAvatarComponent } from './avatar.component';
import { W3sIconModule } from '../icon';
import { W3sDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    W3sAvatarComponent,
  ],
  exports: [
    W3sAvatarComponent,
  ],
  imports: [
    CommonModule,
    W3sIconModule,
    W3sDirectivesModule,
  ]
})
export class W3sAvatarModule {
}
