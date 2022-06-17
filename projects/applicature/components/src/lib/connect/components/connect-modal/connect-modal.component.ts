import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { WalletModule } from '@web3-onboard/common/dist/types';
import { WalletState } from '@web3-onboard/core/dist/types';

import { AucDialogConfig, AucDialogRef } from '../../../dialog';
import { AucWalletConnectService, AucWalletLabel } from '../../services';
import { AucConnectDialogData } from './interfaces';
import { BaseSubscriber } from '../../../helpers';

interface AucDialogWallet extends WalletModule {
  label: AucWalletLabel;
  icon: string;
  active: boolean;
}


@Component({
  selector: 'auc-connect-modal',
  templateUrl: './connect-modal.component.html',
  styleUrls: ['./connect-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucConnectModalComponent extends BaseSubscriber {
  /** @internal */
  public data: AucConnectDialogData;
  /** @internal */
  public wallets: AucDialogWallet[] = [];

  constructor(private _config: AucDialogConfig<AucConnectDialogData>,
              private _cdr: ChangeDetectorRef,
              private _dialogRef: AucDialogRef<AucWalletLabel | null>,
              private _walletConnectService: AucWalletConnectService) {
    super();

    this.data = this._config?.data;
    const state = this._walletConnectService.onboard.state.get();

    this.wallets = (state?.walletModules ?? [])
      .map((wallet: WalletModule) => (
        {
          ...wallet,
          label: wallet.label as AucWalletLabel,
          icon: null,
          active: (state.wallets ?? []).findIndex((el: WalletState) => el.label === wallet.label) !== -1
        }
      ));

    this.wallets
      .forEach(async(wallet: AucDialogWallet, index: number) => {
        this.wallets[index].icon = await wallet.getIcon();
        this._cdr.detectChanges();
      });

    this._walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.wallets
          .forEach((wallet: AucDialogWallet, index: number) => {
            this.wallets[index].active = (res.state.wallets ?? [])
              .findIndex((el: WalletState) => el.label === wallet.label) !== -1
            this._cdr.detectChanges();
          });
      })
  }

  /** @internal */
  public connect(wallet: AucDialogWallet): void {
    if (!wallet?.label) {
      console.error(`Can't find selected wallet`);
    }

    this.close(wallet.active ? null : wallet.label);
  }

  /** @internal */
  close(val: AucWalletLabel | null = null) {
    this._dialogRef.close(val);
  }
}
