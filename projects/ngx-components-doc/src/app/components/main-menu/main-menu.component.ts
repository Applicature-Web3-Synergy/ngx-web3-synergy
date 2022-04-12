import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTER_LINKS } from '../../enums';
import { MainMenuItem } from './interfaces';
import { PageTitlesByUrl } from '../../constants';


@Component({
  selector: 'doc-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MainMenuComponent {
  public menuItems: MainMenuItem[] = [
    {
      routerLink: ROUTER_LINKS.CONNECT_WALLET,
      title: PageTitlesByUrl[ROUTER_LINKS.CONNECT_WALLET]
    },
    {
      routerLink: ROUTER_LINKS.ACCOUNT_BALANCE,
      title: PageTitlesByUrl[ROUTER_LINKS.ACCOUNT_BALANCE]
    },
    {
      routerLink: ROUTER_LINKS.BUTTON,
      title: PageTitlesByUrl[ROUTER_LINKS.BUTTON]
    }
  ];

}
