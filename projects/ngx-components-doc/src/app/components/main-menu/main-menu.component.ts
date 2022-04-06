import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTER_LINKS } from '../../enums';
import { MainMenuItem } from './interfaces';


@Component({
  selector: 'doc-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MainMenuComponent {
  public menuItems: MainMenuItem[] = [
    {
      routerLink: ROUTER_LINKS.BUTTON,
      title: 'Button'
    }
  ];

}
