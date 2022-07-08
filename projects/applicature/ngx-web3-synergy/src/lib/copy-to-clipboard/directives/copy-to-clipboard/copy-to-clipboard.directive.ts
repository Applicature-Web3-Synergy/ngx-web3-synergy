import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { W3sCopyToClipboardAction } from '../../interfaces';


@Directive({
  selector: '[w3sCopyToClipboard]',
  exportAs: 'w3sCopyToClipboard'
})
export class W3sCopyToClipboardDirective {
  /**
   * The string to copy. <br>
   * It's required parameter.
   */
  @Input()
  public textToCopy!: string;

  /** Emits when copied action <br> */
  @Output()
  public action: EventEmitter<W3sCopyToClipboardAction> = new EventEmitter<W3sCopyToClipboardAction>();

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
