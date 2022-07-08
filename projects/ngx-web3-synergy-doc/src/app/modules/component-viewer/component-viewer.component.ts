import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'doc-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: [ './component-viewer.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentViewerComponent {
  @Input()
  public components: Array<string> | undefined;

}
