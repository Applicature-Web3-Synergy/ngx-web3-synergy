import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucDropdownMenuModule, AucDirectivesModule } from '@applicature/ngx-web3-synergy';

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
    AucButtonModule,
    AucDropdownMenuModule,
    AucDirectivesModule
  ]
})
export class ExampleDropdownMenuModule { }
