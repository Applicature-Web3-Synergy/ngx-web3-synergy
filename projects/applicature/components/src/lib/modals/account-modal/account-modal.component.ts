import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';

import { DialogConfig, DialogRef } from '../../dialog';
import { generateJazzicon } from '../../helpers';
import { CHAIN_ID_TO_TYPE_MAP, MAINNET_CHAIN_ID } from '../../helpers/network';
import { Ethereum, EtherscanTransactionLocalStorage } from '../../interfaces';
import { TransactionService } from '../../services/transaction.service';
import { WalletConnectService } from '../../services/wallet-connect.service';
import { AccountModalData } from './interfaces';


@Component({
  selector: 'applicature-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountModalComponent implements OnInit, OnDestroy {
  @ViewChild('infoMain', { static: true })
  public infoMain!: ElementRef;
  public identicon: HTMLDivElement;
  public accountAddress: string;
  public etherscanAddress$: Observable<string>;
  public transactions$: Observable<EtherscanTransactionLocalStorage[]>;
  public data: AccountModalData;

  private _sub: Subscription = new Subscription();

  constructor(
    private _config: DialogConfig<AccountModalData>,
    private _dialogRef: DialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
    private _transactionService: TransactionService
  ) {
    this.data = this._config.data;
    this.transactions$ = this._transactionService.transactionsChanged$;

    this.etherscanAddress$ = this._walletConnectService.networkChanged$
      .pipe(
        filter((networkId) => Number.isSafeInteger(networkId)),
        map(() => {
          const { chainId, selectedAddress } = (window as any).ethereum as Ethereum;
          const subdomain = chainId === MAINNET_CHAIN_ID ? '' : `${CHAIN_ID_TO_TYPE_MAP[chainId]}.`;

          return `https://${subdomain}etherscan.io/address/${selectedAddress}`;
        })
      );
  }

  public ngOnInit(): void {
    let identicon: HTMLDivElement;

    this._sub.add(
      this._walletConnectService.accountsChanged$
        .pipe(
          filter((accounts) => accounts?.length > 0)
        )
        .subscribe(([accountAddress]) => {
          this.accountAddress = accountAddress;

          const element = this.infoMain.nativeElement as HTMLDivElement;

          if (identicon && element.contains(identicon)) {
            element.removeChild(identicon);
          }

          identicon = generateJazzicon(this.accountAddress);

          element.insertBefore(identicon, element.firstChild);

          this._cdr.markForCheck();
        })
    );
  }

  public ngOnDestroy(): void {
    this._transactionService.markAsViewed();

    this._sub.unsubscribe();
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  public onClearTransactionsClick(): void {
    this._transactionService.clearTransactions();
  }

  public onChangeClick(): void {
    if (typeof this.data.change === 'function') {
      this.data.change();
    }
  }

  public onDisconnectClick(): void {
    if (typeof this.data.disconnect === 'function') {
      this.data.disconnect();
    }
  }
}
