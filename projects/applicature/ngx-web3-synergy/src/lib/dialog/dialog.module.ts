import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sDialogComponent } from './dialog.component';
import { W3sCustomizeDialogDirective, W3sInsertionDirective } from './directives';
import { W3sDialogService } from './services';
import { W3sOverlayModule } from '../overlay';
import { W3sBlockScrollHelperService } from '../helpers';


@NgModule({
  declarations: [
    W3sDialogComponent,
    W3sInsertionDirective,
    W3sCustomizeDialogDirective
  ],
  entryComponents: [
    W3sDialogComponent
  ],
  providers: [
    W3sDialogService,
    W3sBlockScrollHelperService
  ],
  imports: [
    CommonModule,
    W3sOverlayModule
  ]
})
export class W3sDialogModule {
}
