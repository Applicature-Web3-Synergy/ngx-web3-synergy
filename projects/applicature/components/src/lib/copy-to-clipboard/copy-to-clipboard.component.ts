import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { CopyToClipboardAction } from './interfaces';


@Component({
  selector: 'auc-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: [ './copy-to-clipboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucCopyToClipboardComponent {
  /**
   * The string to copy. <br>
   * It's required parameter.
   */
  @Input()
  public value!: string;

  /** Emits when copied action <br> */
  @Output()
  public action: EventEmitter<CopyToClipboardAction> = new EventEmitter<CopyToClipboardAction>();

  /** Copy text. <br>
   * Emit {@link action} event.
   */
  public copyText(action: CopyToClipboardAction): void {
    this.action.next(action);
  }
}
