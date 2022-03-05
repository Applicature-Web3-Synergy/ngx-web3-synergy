import { ClipboardModule } from '@angular/cdk/clipboard';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '../avatar/avatar.module';
import { ButtonModule } from '../button/button.module';
import { PipesModule } from '../pipes';
import { AccountButtonComponent } from './account-button.component';
import { ApplicatureCopyToClipboardModule } from '../applicature-copy-to-clipboard';

@NgModule({
  declarations: [
    AccountButtonComponent,
  ],
  exports: [
    AccountButtonComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    OverlayModule,
    PipesModule,
    ClipboardModule,
    ButtonModule,
    ApplicatureCopyToClipboardModule,
  ]
})
export class AccountButtonModule {
}
