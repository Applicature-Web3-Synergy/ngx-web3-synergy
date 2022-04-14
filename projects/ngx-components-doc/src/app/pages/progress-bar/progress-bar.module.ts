import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucProgressBarModule } from '@applicature/components';

import { ProgressBarRoutingModule } from './progress-bar-routing.module';
import { ProgressBarComponent } from './progress-bar.component';
import { BasicProgressBarComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ProgressBarComponent,
    BasicProgressBarComponent
  ],
  imports: [
    CommonModule,
    ProgressBarRoutingModule,
    AucProgressBarModule,
    ComponentViewerModule,
    ExampleCardModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class ProgressBarModule {
}
