import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { WclTableComponent } from './wcl-table.component';

@NgModule({
  declarations: [
    WclTableComponent
  ],
  exports: [
    WclTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
})
export class WclTableModule {
}
