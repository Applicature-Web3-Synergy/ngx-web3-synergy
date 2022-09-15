import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from './table-of-contents.component';



@NgModule({
  declarations: [TableOfContentComponent],
  exports: [TableOfContentComponent],
  imports: [
    CommonModule
  ]
})
export class TableOfContentsModule { }
