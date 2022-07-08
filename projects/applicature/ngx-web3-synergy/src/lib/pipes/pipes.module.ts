import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sShortAddressPipe } from './short-address.pipe';

@NgModule({
  declarations: [
    W3sShortAddressPipe,
  ],
  exports: [
    W3sShortAddressPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class W3sPipesModule {
}
