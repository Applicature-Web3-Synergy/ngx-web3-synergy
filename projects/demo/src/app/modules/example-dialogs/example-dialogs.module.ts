import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucDialogModule } from '@applicature/ngx-web3-synergy';

import { ExampleDialogsComponent } from './example-dialogs.component';
import { DialogTestComponent } from './components/dialog-test/dialog-test.component';


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
    AucDialogModule,
    AucButtonModule
  ],
  entryComponents: [
    DialogTestComponent
  ]
})
export class ExampleDialogsModule {
}
