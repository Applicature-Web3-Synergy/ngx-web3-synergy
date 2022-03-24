import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAvatarModule } from '../avatar';
import { AucButtonModule } from '../button';
import { AucPipesModule } from '../pipes';
import { AucAccountButtonComponent } from './account-button.component';
import { AucCopyToClipboardModule } from '../copy-to-clipboard';
import { AucDirectivesModule } from '../directives';
import { AucDropdownMenuModule } from '../dropdown-menu';


@NgModule({
  declarations: [
    AucAccountButtonComponent
  ],
  exports: [
    AucAccountButtonComponent
  ],
  imports: [
    CommonModule,
    AucAvatarModule,
    AucPipesModule,
    AucButtonModule,
    AucCopyToClipboardModule,
    AucDirectivesModule,
    AucDropdownMenuModule,
  ]
})
export class AucAccountButtonModule {
}
