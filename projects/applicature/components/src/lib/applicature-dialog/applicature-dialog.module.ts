import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureDialogComponent } from './applicature-dialog.component';
import { ApplicatureCustomizeDialogDirective, ApplicatureInsertionDirective } from './directives';
import { ApplicatureDialogService } from './services';
import { ApplicatureOverlayModule } from '../applicature-overlay';
import { ApplicatureBlockScrollHelperService } from '../helpers';


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
    ApplicatureDialogService,
    ApplicatureBlockScrollHelperService
  ],
  imports: [
    CommonModule,
    ApplicatureOverlayModule
  ]
})
export class ApplicatureDialogModule {
}
