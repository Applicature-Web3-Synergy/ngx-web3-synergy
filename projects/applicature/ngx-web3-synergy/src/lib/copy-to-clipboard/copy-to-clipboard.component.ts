import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { W3sCopyToClipboardAction } from './interfaces';


@Component({
  selector: 'w3s-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: [ './copy-to-clipboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sCopyToClipboardComponent {
  /**
   * The string to copy. <br>
   * It's required parameter.
   */
  @Input()
  public value!: string;

  /** Emits when copied action <br> */
  @Output()
  public action: EventEmitter<W3sCopyToClipboardAction> = new EventEmitter<W3sCopyToClipboardAction>();

  /** Copy text. <br>
   * Emit {@link action} event.
   */
  public copyText(action: W3sCopyToClipboardAction): void {
    this.action.next(action);
  }
}
