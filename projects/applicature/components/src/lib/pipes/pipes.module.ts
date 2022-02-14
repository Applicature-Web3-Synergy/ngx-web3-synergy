import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortAddressPipe } from './short-address.pipe';

@NgModule({
  declarations: [
    ShortAddressPipe,
  ],
  exports: [
    ShortAddressPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule {
}
