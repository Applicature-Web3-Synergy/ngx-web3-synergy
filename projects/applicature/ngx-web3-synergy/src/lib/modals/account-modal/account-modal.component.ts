import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { BaseSubscriber, W3S_VALUE_TYPES, w3sCheckValueType, w3sGenerateJazzicon } from '../../helpers';
import { W3sAccountModalData } from './interfaces';
import { W3sDialogConfig, W3sDialogRef } from '../../dialog';
import { W3sBlockExplorerUrlsByChainId, W3sWalletConnectService } from '../../connect';
import { W3sTransactionItem, W3sTransactionService } from '../../transactions';


@Component({
  selector: 'w3s-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: [ './account-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sAccountModalComponent extends BaseSubscriber implements OnInit, OnDestroy {
  public identicon: HTMLDivElement;
  public accountAddress: string;
  public etherscanAddress$: Observable<string>;
  public transactions: W3sTransactionItem[];
  public data: W3sAccountModalData;
  public loadingTransactions = true;
  public copyAction = false;

  /** @internal */
  public isSmallSize = false;

  public get connectedWalletLabel(): string {
    return this._walletConnectService.connectionState?.state?.wallets[0]?.label || '';
  }

  constructor(
    private _config: W3sDialogConfig<W3sAccountModalData>,
    private _dialogRef: W3sDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService,
    private _transactionService: W3sTransactionService
  ) {
    super();

    this.data = this._config.data;
    this._transactionService.transactionsChanged$
      .pipe(
        debounceTime(200),
        catchError(() => of(null)),
        takeUntil(this.notifier)
      )
      .subscribe((transactions: W3sTransactionItem[]) => {
        this.loadingTransactions = false;
        this.transactions = transactions ?? [];

        this._cdr.detectChanges();
      });

    this.etherscanAddress$ = combineLatest([
      this._walletConnectService.chain$,
      this._walletConnectService.accounts$
    ])
      .pipe(
        map(([ chainId, addresses ]: [ string, string[] ]) => {
          if ( !chainId ) {
            return null;
          }

          const config: W3sBlockExplorerUrlsByChainId = this._walletConnectService.blockExplorerUrlByChainId;

          if ( !(config ?? {})[chainId]?.blockExplorerUrl || !addresses.length ) {
            return null;
          }

          return `${config[chainId].blockExplorerUrl}/address/${addresses[0]}`;
        })
      );
  }

  public ngOnInit(): void {
    this._walletConnectService.accounts$
      .pipe(
        filter((accounts) => accounts?.length > 0),
        takeUntil(this.notifier)
      )
      .subscribe(([ accountAddress ]) => {
        this.accountAddress = accountAddress;
        this.identicon = w3sGenerateJazzicon(this.accountAddress, 24);

        this._cdr.detectChanges();
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._transactionService.markAllAsViewed();
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  public onClearTransactionsClick(): void {
    this._transactionService.clearTransactions();
  }

  public onChangeClick(): void {
    if ( w3sCheckValueType(this.data.change, W3S_VALUE_TYPES.FUNCTION) ) {
      this.data.change();
    }
  }

  public disconnectClick(): void {
    if ( w3sCheckValueType(this.data.disconnect, W3S_VALUE_TYPES.FUNCTION) ) {
      this.data.disconnect();
    }
  }

  /** @internal */
  public changedWidth(width: number): void {
    this.isSmallSize = width < 320;
    this._cdr.detectChanges();
  }

  public onCopyAddress() {
    if (this.copyAction) {
      return;
    }

    this.copyAction = true;

    setTimeout(() => {
      this.copyAction = false;
      this._cdr.markForCheck();
    }, 5000);
  }
}
