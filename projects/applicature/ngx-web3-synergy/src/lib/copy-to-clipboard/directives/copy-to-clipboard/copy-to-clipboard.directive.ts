import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { CopyToClipboardAction } from '../../interfaces';


@Directive({
  selector: '[aucCopyToClipboard]',
  exportAs: 'aucCopyToClipboard'
})
export class CopyToClipboardDirective {
  /**
   * The string to copy. <br>
   * It's required parameter.
   */
  @Input()
  public textToCopy!: string;

  /** Emits when copied action <br> */
  @Output()
  public action: EventEmitter<CopyToClipboardAction> = new EventEmitter<CopyToClipboardAction>();

  /** @internal */
  @HostListener('click')
  public onClick(): void {
    this.copyText();
  }

  /** Copy text */
  public copyText(): void {
    navigator.clipboard.writeText(this.textToCopy)
      .then(() => {
        this.action.next({status: 'success'});
      })
      .catch(err => {
        this.action.next({status: 'failed', err});

        console.error('Something went wrong', err);
      });
  }

}
