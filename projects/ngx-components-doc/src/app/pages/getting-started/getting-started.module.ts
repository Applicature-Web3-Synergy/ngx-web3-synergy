import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';


@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  providers: [
    MarkdownService
  ],
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ]
})
export class GettingStartedModule { }
