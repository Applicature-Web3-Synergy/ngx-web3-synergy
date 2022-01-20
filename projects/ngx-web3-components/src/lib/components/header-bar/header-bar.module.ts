import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderBarComponent } from './header-bar.component';

@NgModule({
  declarations: [
    HeaderBarComponent
  ],
  exports: [
    HeaderBarComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class HeaderBarModule {
}
