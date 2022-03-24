import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucDropdownMenuDirective } from './directives';
import { AucDropdownMenuComponent } from './dropdown-menu.component';
import { AucOverlayModule } from '../overlay';
import { AucDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    AucDropdownMenuDirective,
    AucDropdownMenuComponent
  ],
  exports: [
    AucDropdownMenuDirective,
    AucDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    AucOverlayModule,
    AucDirectivesModule
  ]
})
export class AucDropdownMenuModule { }
