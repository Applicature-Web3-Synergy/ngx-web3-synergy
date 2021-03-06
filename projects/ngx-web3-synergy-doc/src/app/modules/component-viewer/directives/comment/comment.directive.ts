import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[docComment]',
  exportAs: 'docComment'
})
export class CommentDirective implements OnInit {
  @Input() docComment: string;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.parseComment(this.docComment);
  }

  parseComment(comment: string): void {
    const values = comment.split('<br>')
      .map((item: string) => {
        let val = item.trim();

        if (!val) {
          return null;
        }

        if (item.includes('{@link')) {
          const matchRegexStr = `\{@link (.*?)\}`;
          
          (val.match(new RegExp(matchRegexStr, 'g')) ?? [])
            .forEach((el: string) => {
              const elToreplace = el.match(new RegExp(matchRegexStr));

              if (!(elToreplace ?? [])[1]) {
                return null;
              }

              val = val.replace(new RegExp(el), `<i>${elToreplace[1]}</i>`);
            });
        }

        return `<div class="doc-comment-item">${val}</div>`
      })
      .filter((item: string) => item?.length);

    this.elementRef.nativeElement.innerHTML = `<div class="doc-comment-list">${values.join(' ')}</div>`;
  }

}
