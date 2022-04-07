import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import 'code-prettify/loader/run_prettify';

declare const window: Window & { PR: any };


@Component({
  selector: 'doc-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentViewerComponent {

  /**
   * The title of the example snippet.
   */
  @Input()
  public exampleTitle = '';

  /**
   * The code to show as an example.
   */
  @Input()
  public code = '';

  @Input()
  public testCode = '';

  /**
   * The name of the component to show an example for.
   */
  @Input()
  public components: Array<string> | undefined;

  /**
   * The language of the code.
   * Preset is HTML.
   */
  @Input()
  public lang: 'HTML' | 'js' = 'HTML';

  /**
   * Array the tabs to be shown.
   */
  @Input()
  public tabsToShow: Array<string> = [ 'example', 'code' ];


  constructor() {
  }

  /**
   * PrettyPrints as soon as the content is initialized and adds the api tab if needed.
   */
  public ngAfterViewInit(): void {
    if (this.components && this.components.length > 0 && !this.tabsToShow.includes('api')) {
      this.tabsToShow.push('api');
    }

    this.prettyPrint();
  }

  /**
   * Pretty prints the example text again.
   */
  public prettyPrint(): void {
    window.PR?.prettyPrint();
  }

}
