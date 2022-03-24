import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAvatarComponent } from './avatar.component';
import { AucIconModule } from '../icon';
import { AucDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    AucAvatarComponent,
  ],
  exports: [
    AucAvatarComponent,
  ],
  imports: [
    CommonModule,
    AucIconModule,
    AucDirectivesModule,
  ]
})
export class AucAvatarModule {
}
