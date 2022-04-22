import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { AucButtonModule, AucDialogModule, ModalsModule } from '@applicature/components';

import { DialogRoutingModule } from './dialog-routing.module';
import { DialogComponent } from './dialog.component';
import { BasicDialogComponent, CustomDialogComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    DialogComponent,
    BasicDialogComponent,
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    DialogRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    AucButtonModule,
    AucDialogModule,
    ModalsModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class DialogModule {
}
