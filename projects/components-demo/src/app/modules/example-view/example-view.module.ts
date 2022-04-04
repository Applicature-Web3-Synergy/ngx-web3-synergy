import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleViewComponent } from './example-view.component';
import { DocViewComponent } from './components/doc-view/doc-view.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentationParserService } from './services';


@NgModule({
  declarations: [
    ExampleViewComponent,
    DocViewComponent,
  ],
  exports: [
    ExampleViewComponent
  ],
  providers: [DocumentationParserService],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ExampleViewModule { }
