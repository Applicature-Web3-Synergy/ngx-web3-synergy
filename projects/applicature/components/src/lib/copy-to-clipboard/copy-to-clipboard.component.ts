import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'auc-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucCopyToClipboardComponent {
  /**
   * {@link value} - It's an `@Input()` parameter.
   * The value which will be copied after click on copy btn.
   * This is required parameter.
   */
  @Input() value!: string;
}
