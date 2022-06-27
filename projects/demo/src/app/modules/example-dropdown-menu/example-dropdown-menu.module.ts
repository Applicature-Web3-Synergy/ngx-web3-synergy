import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucDropdownMenuModule, AucDirectivesModule } from '@applicature/components';

import { ExampleCustomDropdownMenuComponent } from './components/example-custom-dropdown-menu/example-custom-dropdown-menu.component';


@NgModule({
  declarations: [
    ExampleCustomDropdownMenuComponent
  ],
  exports: [
    ExampleCustomDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucDropdownMenuModule,
    AucDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
