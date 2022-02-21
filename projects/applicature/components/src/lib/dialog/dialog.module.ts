import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogService } from './services';
import { InsertionDirective } from './directives';

@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    DialogService
  ],
  imports: [
    CommonModule
  ]
})
export class DialogModule {
}
