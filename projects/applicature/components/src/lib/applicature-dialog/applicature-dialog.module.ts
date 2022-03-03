import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureDialogComponent } from './applicature-dialog.component';
import { ApplicatureCustomizeDialogDirective, ApplicatureInsertionDirective } from './directives';
import { ApplicatureDialogService } from './services';


@NgModule({
  declarations: [
    ApplicatureDialogComponent,
    ApplicatureInsertionDirective,
    ApplicatureCustomizeDialogDirective
  ],
  entryComponents: [
    ApplicatureDialogComponent
  ],
  providers: [
    ApplicatureDialogService
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureDialogModule {
}
