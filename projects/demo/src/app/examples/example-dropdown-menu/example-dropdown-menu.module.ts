import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, ApplicatureDropdownMenuModule, AucDirectivesModule } from '@applicature/components';

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
    AucDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
