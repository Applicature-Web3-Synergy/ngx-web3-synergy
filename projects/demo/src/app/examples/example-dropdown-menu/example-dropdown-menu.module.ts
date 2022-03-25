import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucDropdownMenuModule, AucDirectivesModule } from '@applicature/components';

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
    AucDropdownMenuModule,
    AucDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
