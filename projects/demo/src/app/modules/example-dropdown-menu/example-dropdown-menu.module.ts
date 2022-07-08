import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sButtonModule, W3sDropdownMenuModule, W3sDirectivesModule } from '@applicature/ngx-web3-synergy';

import { ExampleCustomDropdownMenuComponent } from './components';


@NgModule({
  declarations: [
    ExampleCustomDropdownMenuComponent
  ],
  exports: [
    ExampleCustomDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    W3sButtonModule,
    W3sDropdownMenuModule,
    W3sDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
