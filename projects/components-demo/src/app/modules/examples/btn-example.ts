import { html } from "../example-view/example-veiew.config";

export const buttonDemo: TemplateStringsArray =
html`<auc-button label="Button"></auc-button>`

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
