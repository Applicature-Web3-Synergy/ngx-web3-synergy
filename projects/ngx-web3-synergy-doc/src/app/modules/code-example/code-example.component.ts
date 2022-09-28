import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { CodeConfig } from './interfaces';


@Component({
  selector: 'doc-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: [ './code-example.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeExampleComponent {
  @Input() public codeConfig!: CodeConfig;
  @Input() public isWhiteTheme = false;

  public get classes(): { [key: string]: boolean } {
    return {
      'white-theme': this.isWhiteTheme,
      [`lang-${this.codeConfig.lang}`]: !!this.codeConfig.lang
    };
  }

  public copyAction = false;

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  public onCopyCode() {
    if (this.copyAction) {
      return;
    }

    this.copyAction = true;

    setTimeout(() => {
      this.copyAction = false;
      this._cdr.markForCheck();
    }, 5000);
  }
}
