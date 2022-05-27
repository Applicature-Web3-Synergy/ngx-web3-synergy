import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

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

  public get classes(): {[key: string]: boolean} {
    return {
      'white-theme' : this.isWhiteTheme,
      [`lang-${this.codeConfig.lang}`]: !!this.codeConfig.lang
    };
  }
}
