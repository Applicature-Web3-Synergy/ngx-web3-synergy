import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AUC_VALUE_TYPES, aucCheckValueType, aucGenerateJazzicon } from '../../helpers';
import { AucNetworkOption, AucEtherscanTransactionLocalStorage } from '../../interfaces';
import { AucAccountModalData } from './interfaces';
import { AucDialogConfig, AucDialogRef } from '../../dialog';
import { AucConnectionState, AucTransactionService, AucWalletConnectService } from '../../services';


@Component({
  selector: 'auc-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: [ './account-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountModalComponent implements OnInit, OnDestroy {
  public identicon: HTMLDivElement;
  public accountAddress: string;
  public etherscanAddress$: Observable<string>;
  public transactions$: Observable<AucEtherscanTransactionLocalStorage[]>;
  public data: AucAccountModalData;

  private _sub: Subscription = new Subscription();

  constructor(
    private _config: AucDialogConfig<AucAccountModalData>,
    private _dialogRef: AucDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _transactionService: AucTransactionService
  ) {
    this.data = this._config.data;
    this.transactions$ = this._transactionService.transactionsChanged$;

    this.etherscanAddress$ = this._walletConnectService.selectedNetwork$
      .pipe(
        map((network: AucNetworkOption) => {
          const connectionInfo: AucConnectionState = this._walletConnectService.connectionState;

          if (!network || !network.blockExplorerUrl || !connectionInfo?.state?.address) {
            return null;
          }

          return `${network.blockExplorerUrl}/address/${connectionInfo.state.address}`
        })
      );
  }

  public ngOnInit(): void {
    this._sub.add(
      this._walletConnectService.accountsChanged$
        .pipe(
          filter((accounts) => accounts?.length > 0)
        )
        .subscribe(([ accountAddress ]) => {
          this.accountAddress = accountAddress;
          this.identicon = aucGenerateJazzicon(this.accountAddress);

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
