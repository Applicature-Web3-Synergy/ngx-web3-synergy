import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { map, Observable } from 'rxjs';

import { RouterHelperService } from '../../services/router-helper';
import { ROUTER_LINKS, URL_FRAGMENTS } from '../../enums';


@Component({
  selector: 'doc-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  name = 'WEB3 SYNERGY';
  isStartPage$: Observable<boolean>;

  isOpenedMenu = false;
  isMobile = false;

  URL_FRAGMENTS = URL_FRAGMENTS;

  navigationMenu: { title: string, fragment: URL_FRAGMENTS, activeClass?: boolean }[] = [
    {
      title: 'About',
      fragment: URL_FRAGMENTS.ABOUT
    },
    {
      title: 'Components',
      fragment: URL_FRAGMENTS.COMPONENTS
    },
    {
      title: 'Play',
      fragment: URL_FRAGMENTS.PLAY
    },
    {
      title: 'API Library',
      fragment: URL_FRAGMENTS.API,
      activeClass: true
    }
  ];
  activeLink$: Observable<string | null>;

  @HostListener('window:resize')
  onResize() {
    this.checkIsMobile();
  }

  constructor(private routerHelperService: RouterHelperService) {
    this.isStartPage$ = this.routerHelperService.currentUrl$
      .pipe(
        map((url: string) => url === `/${ROUTER_LINKS.GETTING_STARTED}` || url === '/')
      );

    this.checkIsMobile();
  }

  checkIsMobile(): void {
    const width = window.innerWidth;
    const mobileWidth = 960;

    if (width > mobileWidth ) {
      this.isMobile = false;
      this.isOpenedMenu = false;

      return;
    }

    this.isMobile = true;
  }

  toggleMenu(): void {
    this.isOpenedMenu = !this.isOpenedMenu;
  }

  menuBtnAction(): void {
    if (this.isMobile && this.isOpenedMenu) {
      this.toggleMenu();
    }
  }

}
