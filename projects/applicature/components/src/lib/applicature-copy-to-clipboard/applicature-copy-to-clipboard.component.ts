import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'applicature-copy-to-clipboard',
  templateUrl: './applicature-copy-to-clipboard.component.html',
  styleUrls: ['./applicature-copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureCopyToClipboardComponent {
  @Input() value!: string;
}
