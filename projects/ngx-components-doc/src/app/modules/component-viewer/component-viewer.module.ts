import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentViewerComponent } from './component-viewer.component';
import { ApiContainerComponent } from './components/api-container/api-container.component';
import { CodeExampleModule } from '../code-example/code-example.module';


@NgModule({
  declarations: [
    ComponentViewerComponent,
    ApiContainerComponent
  ],
  exports: [
    ComponentViewerComponent
  ],
  imports: [
    CommonModule,
    CodeExampleModule
  ]
})
export class ComponentViewerModule {
}
