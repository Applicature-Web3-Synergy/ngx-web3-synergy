import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs';

import { MarkdownService } from 'ngx-markdown';
import { BaseSubscriber } from '@applicature/components';


@Component({
  selector: 'doc-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: [ './getting-started.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent extends BaseSubscriber implements OnInit {
  markdown: string = '';

  constructor(private cdr: ChangeDetectorRef,
              private http: HttpClient,
              private markdownService: MarkdownService
  ) {
    super();
  }

  ngOnInit(): void {
    this.http.get(`/assets/md/component.md`, { responseType: 'text' })
      .pipe(takeUntil(this.notifier))
      .subscribe(res => {
        if (!res) {
          return;
        }

        this.markdown = this.markdownService.compile(res);
        this.cdr.markForCheck();
      })
  }

}
