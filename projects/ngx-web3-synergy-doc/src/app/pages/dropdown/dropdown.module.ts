import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { W3sButtonModule, W3sDropdownMenuModule } from '@applicature/ngx-web3-synergy';

import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownComponent } from './dropdown.component';
import { BasicDropdownComponent, CustomizedDropdownComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    DropdownComponent,
    BasicDropdownComponent,
    CustomizedDropdownComponent
  ],
  imports: [
    CommonModule,
    DropdownRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sButtonModule,
    W3sDropdownMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DropdownModule {
}
