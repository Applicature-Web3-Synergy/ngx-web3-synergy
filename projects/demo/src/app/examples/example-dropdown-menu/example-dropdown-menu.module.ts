import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, ApplicatureDropdownMenuModule, ApplicatureDirectivesModule } from '@applicature/components';

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
    ButtonModule,
    ApplicatureDropdownMenuModule,
    ApplicatureDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
