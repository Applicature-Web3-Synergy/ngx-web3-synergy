import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { RouterHelperService } from '../../services/router-helper';
import { ROUTER_LINKS } from '../../enums';


@Component({
  selector: 'doc-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  name = 'NGX UNIVERSAL COMPONENTS';
  isStartPage$: Observable<boolean>;

  constructor(private routerHelperService: RouterHelperService) {
    this.isStartPage$ = this.routerHelperService.currentUrl$
      .pipe(
        map((url: string) => url === `/${ROUTER_LINKS.GETTING_STARTED}` || url === '/')
      );
  }

}
