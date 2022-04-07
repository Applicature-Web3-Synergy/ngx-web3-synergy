import { ChangeDetectionStrategy, Component } from '@angular/core';
import { html } from '../../../../../components-demo/src/app/modules/example-view/example-veiew.config';

export const buttonDemo: TemplateStringsArray =
  html`<auc-button label="Button"></auc-button>`;

export const testCode: any = `import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { buttonDemo } from '../examples/btn-example';


@Component({
  selector: 'demo-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: [ './button-demo.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoComponent {
  public buttonDemo: any = buttonDemo;
  public testCode: any = testCode;

  public onClick(evt): void {
    console.log('Btn example clicked: ', evt);
  }

}
`;


@Component({
  selector: 'doc-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  public buttonDemo: any = buttonDemo;
  public testCode: any = testCode;

  public onClick(evt): void {
    console.log('Btn example clicked: ', evt);
  }
}
