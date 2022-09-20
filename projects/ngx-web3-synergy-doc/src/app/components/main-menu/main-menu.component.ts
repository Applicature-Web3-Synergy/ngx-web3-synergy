import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTER_LINKS } from '../../enums';
import { MainMenuItem } from './interfaces';
import { IconTitlesByUrl, PageTitlesByUrl } from '../../constants';


@Component({
  selector: 'doc-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [ './main-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MainMenuComponent {
  public menuItems: MainMenuItem[] = [
    {
      routerLink: ROUTER_LINKS.GETTING_STARTED,
      title: PageTitlesByUrl[ROUTER_LINKS.GETTING_STARTED],
      icon: IconTitlesByUrl[ROUTER_LINKS.GETTING_STARTED],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.CONNECT_WALLET,
      title: PageTitlesByUrl[ROUTER_LINKS.CONNECT_WALLET],
      icon: IconTitlesByUrl[ROUTER_LINKS.CONNECT_WALLET],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.ACCOUNT_BUTTON,
      title: PageTitlesByUrl[ROUTER_LINKS.ACCOUNT_BUTTON],
      icon: IconTitlesByUrl[ROUTER_LINKS.ACCOUNT_BUTTON],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.ACCOUNT_BALANCE,
      title: PageTitlesByUrl[ROUTER_LINKS.ACCOUNT_BALANCE],
      icon: IconTitlesByUrl[ROUTER_LINKS.ACCOUNT_BALANCE],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.TRANSACTION_HISTORY,
      title: PageTitlesByUrl[ROUTER_LINKS.TRANSACTION_HISTORY],
      icon: IconTitlesByUrl[ROUTER_LINKS.TRANSACTION_HISTORY],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.NETWORK_DROPDOWN,
      title: PageTitlesByUrl[ROUTER_LINKS.NETWORK_DROPDOWN],
      icon: IconTitlesByUrl[ROUTER_LINKS.NETWORK_DROPDOWN],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.FAUCET,
      title: PageTitlesByUrl[ROUTER_LINKS.FAUCET],
      icon: IconTitlesByUrl[ROUTER_LINKS.FAUCET],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.INPUT,
      title: PageTitlesByUrl[ROUTER_LINKS.INPUT],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.BUTTON,
      title: PageTitlesByUrl[ROUTER_LINKS.BUTTON],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.ALERT,
      title: PageTitlesByUrl[ROUTER_LINKS.ALERT],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.AVATAR,
      title: PageTitlesByUrl[ROUTER_LINKS.AVATAR],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.TABLE,
      title: PageTitlesByUrl[ROUTER_LINKS.TABLE],
      icon: IconTitlesByUrl[ROUTER_LINKS.TABLE],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.DIALOG,
      title: PageTitlesByUrl[ROUTER_LINKS.DIALOG],
      icon: IconTitlesByUrl[ROUTER_LINKS.DIALOG],
      disabled: false
    },
    {
      routerLink: ROUTER_LINKS.DROPDOWN,
      title: PageTitlesByUrl[ROUTER_LINKS.DROPDOWN],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.COPY_TO_CLIPBOARD,
      title: PageTitlesByUrl[ROUTER_LINKS.COPY_TO_CLIPBOARD],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.ICON,
      title: PageTitlesByUrl[ROUTER_LINKS.ICON],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.PROGRESS_BAR,
      title: PageTitlesByUrl[ROUTER_LINKS.PROGRESS_BAR],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.SPINNER,
      title: PageTitlesByUrl[ROUTER_LINKS.SPINNER],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.RIPPLE,
      title: PageTitlesByUrl[ROUTER_LINKS.RIPPLE],
      disabled: true
    },
    {
      routerLink: ROUTER_LINKS.SHORT_ADDRESS,
      title: PageTitlesByUrl[ROUTER_LINKS.SHORT_ADDRESS],
      disabled: true
    }
  ];
}
