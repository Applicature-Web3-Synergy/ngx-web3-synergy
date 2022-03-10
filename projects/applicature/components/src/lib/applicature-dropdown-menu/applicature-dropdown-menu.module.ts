import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatuteDropdownMenuDirective } from './directives';
import { ApplicatureDropdownMenuComponent } from './applicature-dropdown-menu.component';
import { ApplicatureOverlayModule } from '../applicature-overlay';
import { ApplicatureDirectivesModule } from '../directives';


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
    ApplicatureOverlayModule,
    ApplicatureDirectivesModule
  ]
})
export class ApplicatureDropdownMenuModule { }
