import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { AUC_VALUE_TYPES, aucCheckValueType, aucGenerateJazzicon, BaseSubscriber } from '../../helpers';
import { AucAccountModalData } from './interfaces';
import { AucDialogConfig, AucDialogRef } from '../../dialog';
import { AucWalletConnectService, BlockExplorerUrlsByChainId } from '../../connect/services';
import { AucTransactionItem, AucTransactionService } from '../../transactions';


@Component({
  selector: 'auc-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: [ './account-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountModalComponent extends BaseSubscriber implements OnInit, OnDestroy {
  public identicon: HTMLDivElement;
  public accountAddress: string;
  public etherscanAddress$: Observable<string>;
  public transactions: AucTransactionItem[];
  public data: AucAccountModalData;
  public loadingTransactions: boolean = true;

  constructor(
    private _config: AucDialogConfig<AucAccountModalData>,
    private _dialogRef: AucDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _transactionService: AucTransactionService
  ) {
    super();

    this.data = this._config.data;
    this._transactionService.transactionsChanged$
      .pipe(
        debounceTime(200),
        catchError(() => of(null)),
        takeUntil(this.notifier)
      )
      .subscribe((transactions: AucTransactionItem[]) => {
        this.loadingTransactions = false;
        this.transactions = transactions ?? [];

        this._cdr.detectChanges();
      });

    this.etherscanAddress$ = combineLatest([
      this._walletConnectService.chain$,
      this._walletConnectService.accounts$
    ])
      .pipe(
        map(([chainId, addresses]: [string, string[]]) => {
          if (!chainId) {
            return null;
          }

          const config: BlockExplorerUrlsByChainId = this._walletConnectService.blockExplorerUrlByChainId;

          if (!(config ?? {})[chainId]?.blockExplorerUrl || !addresses.length) {
            return null;
          }

          return `${config[chainId].blockExplorerUrl}/address/${addresses[0]}`
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
          this.identicon = aucGenerateJazzicon(this.accountAddress);

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
    if (aucCheckValueType(this.data.change, AUC_VALUE_TYPES.FUNCTION)) {
      this.data.change();
    }
  }

  public onDisconnectClick(): void {
    if (aucCheckValueType(this.data.disconnect, AUC_VALUE_TYPES.FUNCTION)) {
      this.data.disconnect();
    }
  }
}
