import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentViewerComponent } from './component-viewer.component';
import { ApiContainerComponent } from './components/api-container/api-container.component';


@NgModule({
  declarations: [
    ComponentViewerComponent,
    ApiContainerComponent
  ],
  exports: [
    ComponentViewerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentViewerModule {
}
