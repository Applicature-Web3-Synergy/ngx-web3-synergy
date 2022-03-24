import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucDialogComponent } from './dialog.component';
import { AucCustomizeDialogDirective, AucInsertionDirective } from './directives';
import { AucDialogService } from './services';
import { AucOverlayModule } from '../overlay';
import { AucBlockScrollHelperService } from '../helpers';


@NgModule({
  declarations: [
    AucDialogComponent,
    AucInsertionDirective,
    AucCustomizeDialogDirective
  ],
  entryComponents: [
    AucDialogComponent
  ],
  providers: [
    AucDialogService,
    AucBlockScrollHelperService
  ],
  imports: [
    CommonModule,
    AucOverlayModule
  ]
})
export class AucDialogModule {
}
