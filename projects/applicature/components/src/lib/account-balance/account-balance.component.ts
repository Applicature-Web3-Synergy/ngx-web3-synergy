import { Component, ChangeDetectionStrategy, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { generateJazzicon, normalizeBalance } from '../helpers';
import { WalletConnectService } from '../services';

export type ApplicatureBalanceAppearance = 'transparent' | 'translucent' | 'blue';

@Component({
  selector: 'applicature-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBalanceComponent implements OnInit {
  @Input()
  public appearance: ApplicatureBalanceAppearance = 'translucent';

  @Input()
  public showIcon: boolean = true;

  @Input()
  public showAddress: boolean = false;

  @Input()
  public showIdenticon: boolean = false;

  public address$: Observable<string>;
  public balance$: Observable<string>;

  @ViewChild('addressRef', { static: true })
  private _addressRef!: ElementRef<HTMLDivElement>;

  public get classNames(): { [el: string]: boolean } {
    return {
      ['balance']: true,
      [`balance--${this.appearance}`]: true,
      ['balance--address']: this.showAddress,
    };
  }

  constructor(
    private _walletConnectService: WalletConnectService,
  ) {
    this.balance$ = this._walletConnectService.balanceChanged$
      .pipe(
        map((balance) => normalizeBalance(balance)),
      );

  }

  public ngOnInit(): void {
    this.address$ = this._walletConnectService.accountsChanged$
      .pipe(
        map((accounts) => {
          if (accounts?.length && accounts[0]) {
            const element = this._addressRef?.nativeElement;

            if (this.showIdenticon && element) {
              const identicon = generateJazzicon(accounts[0]);
              const previousIdenticon = element.querySelector(':scope > div');

              if (previousIdenticon) {
                element.removeChild(previousIdenticon);
              }

              identicon.style.marginLeft = '8px';

              element.appendChild(identicon);
            }
          }

          return accounts?.length && accounts[0];
        }),
      );
  }
}
