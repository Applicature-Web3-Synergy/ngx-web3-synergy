import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';

import 'code-prettify/loader/run_prettify';
import { DocumentationParserService } from './services';
// import { sleep } from '../helpers';

declare const window: Window & { PR: any };

@Component({
  selector: 'demo-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: [ './example-view.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleViewComponent implements AfterViewInit {

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


  constructor(private documentationParserService: DocumentationParserService) {
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
