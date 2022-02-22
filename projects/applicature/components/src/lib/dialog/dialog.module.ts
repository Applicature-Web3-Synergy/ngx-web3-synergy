import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogService } from './services';
import { CustomizeDialogDirective,  InsertionDirective } from './directives';

@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective,
    CustomizeDialogDirective
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
