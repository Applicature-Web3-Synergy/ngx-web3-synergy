import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MarkdownModule, MarkdownService, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';


function replacePre(text: string): string {
  if (text.includes(`<pre>`)) {
    text = text.replace('<pre>', '<pre class="doc prettyprint lang-js">');

    return replacePre(text);
  }

  return text;
}

function replaceCode(text: string): string {
  if (text.includes(`<code>`)) {
    text = text.replace('<code>', '<code class="getting-started-code">');

    return replaceCode(text);
  }

  return text;
}

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return `<blockquote class="doc-blockquote"><p><em>${text}</em></p></blockquote>`;
  };

  renderer.code = (code: string) => {
    if (!code) {
      return '';
    }

    return `<code class="getting-started-code">${code}</code>`;
  };

  renderer.paragraph = (text: string) => {
    const includesCode = text.includes(`<code`);

    if (includesCode) {
      text = replaceCode(text);
    }

    return `<p class="getting-started-paragraph ${includesCode ? 'with-code': ''}">${text}</p>`;
  };

  renderer.html = (html: string) => {
    return replacePre(html);
  };

  renderer.heading = (text: string, level: number): string => {
    if (!text || !level) {
      return '';
    }

    if (level === 1) {
      return `<h1 class="getting-started-h1">${text}</h1>`
    }

    if (level === 2) {
      return `<h2 class="getting-started-h2">${text}</h2>`
    }

    if (level === 3) {
      return `<h3 class="getting-started-h3">${text}</h3>`
    }

    if (level === 4) {
      return `<h4 class="getting-started-h4">${text}</h4>`
    }

    if (level === 5) {
      return `<h5 class="getting-started-h5">${text}</h5>`
    }

    if (level === 6) {
      return `<h6 class="getting-started-h5">${text}</h6>`
    }

    return '';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}


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
        useFactory: markedOptionsFactory,
      }
    }),
  ]
})
export class GettingStartedModule {
}
