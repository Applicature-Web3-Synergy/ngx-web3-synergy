import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucShortAddressPipe } from './short-address.pipe';

@NgModule({
  declarations: [
    AucShortAddressPipe,
  ],
  exports: [
    AucShortAddressPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class AucPipesModule {
}
