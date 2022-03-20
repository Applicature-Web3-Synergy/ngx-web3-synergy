import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatuteDropdownMenuDirective } from './directives';
import { ApplicatureDropdownMenuComponent } from './applicature-dropdown-menu.component';
import { AucOverlayModule } from '../renamed/overlay';
import { AucDirectivesModule } from '../renamed/directives';


@NgModule({
  declarations: [
    ApplicatuteDropdownMenuDirective,
    ApplicatureDropdownMenuComponent
  ],
  exports: [
    ApplicatuteDropdownMenuDirective,
    ApplicatureDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    AucOverlayModule,
    AucDirectivesModule
  ]
})
export class ApplicatureDropdownMenuModule { }
