import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule, AucDropdownMenuModule } from '@applicature/components';

import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownComponent } from './dropdown.component';
import { BasicDropdownComponent, CustomizedDropdownComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
    AucButtonModule,
    AucDropdownMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DropdownModule { }
