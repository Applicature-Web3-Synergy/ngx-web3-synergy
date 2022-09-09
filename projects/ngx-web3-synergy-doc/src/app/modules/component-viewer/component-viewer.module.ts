import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentViewerComponent } from './component-viewer.component';
import { ApiContainerComponent } from './components/api-container/api-container.component';
import { CodeExampleModule } from '../code-example/code-example.module';
import { CommentDirective } from './directives';
import { ExampleCardModule } from '../example-card/example-card.module';


@NgModule({
  declarations: [
    ComponentViewerComponent,
    ApiContainerComponent,
    CommentDirective
  ],
  exports: [
    ComponentViewerComponent
  ],
  imports: [
    CommonModule,
    CodeExampleModule,
    ExampleCardModule
  ]
})
export class ComponentViewerModule {
}
