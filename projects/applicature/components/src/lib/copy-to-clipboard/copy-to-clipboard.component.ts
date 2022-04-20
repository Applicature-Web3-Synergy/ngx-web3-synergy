import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'auc-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucCopyToClipboardComponent {
  /**
   * The string to copy. <br>
   * This is required parameter.
   */
  @Input()
  public value!: string;
}
