import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, ApplicatureDropdownMenuModule, ApplicatureDirectivesModule } from '@applicature/components';

import { CustomDropdownMenuComponent } from './components';


@NgModule({
  declarations: [
    CustomDropdownMenuComponent
  ],
  exports: [
    CustomDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    ApplicatureDropdownMenuModule,
    ApplicatureDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
