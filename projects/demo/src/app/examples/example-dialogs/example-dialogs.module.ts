import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '@applicature/components';

import { ExampleDialogsComponent } from './example-dialogs.component';
import { DialogTestComponent } from './components/dialog-test/dialog-test.component';
import { ApplicatureDialogModule } from '../../../../../applicature/components/src/lib/applicature-dialog';


@NgModule({
  declarations: [
    ExampleDialogsComponent,
    DialogTestComponent
  ],
  exports: [
    ExampleDialogsComponent
  ],
  imports: [
    CommonModule,
    ApplicatureDialogModule,
    AucButtonModule
  ],
  entryComponents: [
    DialogTestComponent
  ]
})
export class ExampleDialogsModule {
}
