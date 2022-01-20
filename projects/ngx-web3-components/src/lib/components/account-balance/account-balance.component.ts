import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { normalizeBalance } from '../../helpers';
import { Ethereum } from '../../interfaces';
import { WalletService } from '../../services';

export type  AccountBalanceBackgroundColor = 'blue' | 'white' | 'grey' | 'translucent' | 'transparent';

@Component({
  selector: 'account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBalanceComponent {
  @Input()
  public icon!: string;

  @Input()
  public size: 'default' | 'small' = 'default';

  @Input()
  public color: AccountBalanceBackgroundColor = 'white';

  @Input()
  public showAddress: boolean = false;

  public get classNames(): { [el: string]: boolean } {
    return {
      ['wcl-account-balance']: true,
      [`wcl-account-balance--${this.color}`]: true,
      [`wcl-account-balance--${this.size}`]: true,
      ['wcl-account-balance--with-account']: this.showAddress,
    };
  }

  public accountAddress!: string;
  public balance$: Observable<string>;

  constructor(
    private _walletService: WalletService,
    private _cdr: ChangeDetectorRef,
  ) {
    this.balance$ = this._walletService.balanceChanged$
      .pipe(
        map((balance) => {
          const { selectedAddress } = (window as any).ethereum as Ethereum;
          this.accountAddress = selectedAddress;

          this._cdr.markForCheck();

          return normalizeBalance(balance);
        })
      );
  }
}
