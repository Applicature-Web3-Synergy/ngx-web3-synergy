import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAvatarModule } from '../avatar';
import { W3sButtonModule } from '../button';
import { W3sPipesModule } from '../pipes';
import { W3sAccountButtonComponent } from './account-button.component';
import { W3sCopyToClipboardModule } from '../copy-to-clipboard';
import { W3sDirectivesModule } from '../directives';
import { W3sDropdownMenuModule } from '../dropdown-menu';


@NgModule({
  declarations: [
    W3sAccountButtonComponent
  ],
  exports: [
    W3sAccountButtonComponent
  ],
  imports: [
    CommonModule,
    W3sAvatarModule,
    W3sPipesModule,
    W3sButtonModule,
    W3sCopyToClipboardModule,
    W3sDirectivesModule,
    W3sDropdownMenuModule,
  ]
})
export class W3sAccountButtonModule {
}
