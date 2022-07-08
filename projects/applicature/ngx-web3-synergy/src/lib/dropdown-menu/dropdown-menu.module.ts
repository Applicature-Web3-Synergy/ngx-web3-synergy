import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sDropdownMenuDirective } from './directives';
import { W3sDropdownMenuComponent } from './dropdown-menu.component';
import { W3sOverlayModule } from '../overlay';
import { W3sDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    W3sDropdownMenuDirective,
    W3sDropdownMenuComponent
  ],
  exports: [
    W3sDropdownMenuDirective,
    W3sDropdownMenuComponent,
    W3sDirectivesModule
  ],
  imports: [
    CommonModule,
    W3sOverlayModule,
    W3sDirectivesModule
  ]
})
export class W3sDropdownMenuModule { }
