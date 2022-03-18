import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AucAvatarModule } from '../renamed/avatar';
import { AucButtonModule } from '../renamed/button';
import { PipesModule } from '../pipes';
import { AccountButtonComponent } from './account-button.component';
import { ApplicatureCopyToClipboardModule } from '../applicature-copy-to-clipboard';
import { AucDirectivesModule } from '../renamed/directives';
import { ApplicatureDropdownMenuModule } from '../applicature-dropdown-menu';

@NgModule({
  declarations: [
    AccountButtonComponent,
  ],
  exports: [
    AccountButtonComponent,
  ],
  imports: [
    CommonModule,
    AucAvatarModule,
    PipesModule,
    AucButtonModule,
    ApplicatureCopyToClipboardModule,
    AucDirectivesModule,
    ApplicatureDropdownMenuModule,
  ]
})
export class AccountButtonModule {
}
