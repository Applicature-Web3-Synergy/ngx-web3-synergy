import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureDialogComponent } from './applicature-dialog.component';
import { ApplicatureCustomizeDialogDirective, ApplicatureInsertionDirective } from './directives';
import { ApplicatureDialogService } from './services';
import { AucOverlayModule } from '../renamed/overlay';
import { AucBlockScrollHelperService } from '../helpers';


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
    AucBlockScrollHelperService
  ],
  imports: [
    CommonModule,
    AucOverlayModule
  ]
})
export class ApplicatureDialogModule {
}
