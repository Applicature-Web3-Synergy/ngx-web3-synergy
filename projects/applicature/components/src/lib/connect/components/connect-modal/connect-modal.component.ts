import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { WalletModule } from '@web3-onboard/common/dist/types';
import { WalletState } from '@web3-onboard/core/dist/types';

import { AucDialogConfig, AucDialogRef } from '../../../dialog';
import {
  AucWalletConfigMap,
  AucWalletLabel,
  AucWalletsToInitLabel
} from '../../services';
import { AucConnectDialogData, AucConnectWalletItem } from './interfaces';
import { AucInstallWalletHelperService, BaseSubscriber } from '../../../helpers';
import { AucWalletsIcons, AucWalletsLinks } from '../../constants';


@Component({
  selector: 'auc-connect-modal',
  templateUrl: './connect-modal.component.html',
  styleUrls: [ './connect-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucConnectModalComponent extends BaseSubscriber {
  /** @internal */
  public data: AucConnectDialogData;
  /** @internal */
  private _walletsMap: Map<AucWalletLabel, AucConnectWalletItem> = new Map<AucWalletLabel, AucConnectWalletItem>();

  /** @internal */
  public get wallets(): AucConnectWalletItem[] {
    return [ ...(this._walletsMap.values() || []) ]
      .sort((a: AucConnectWalletItem, b: AucConnectWalletItem) => a.position - b.position);
  }

  constructor(private _config: AucDialogConfig<AucConnectDialogData>,
              private _cdr: ChangeDetectorRef,
              private _dialogRef: AucDialogRef<AucWalletLabel | null>,
              private _installWalletHelperService: AucInstallWalletHelperService) {
    super();

    this.data = this._config?.data;
    const state = this.data.service.onboard.state.get();
    const initWallets: Map<AucWalletsToInitLabel, AucWalletConfigMap> = this.data.service.initializedWalletsMap;

    (state?.walletModules ?? []).forEach((wallet: WalletModule) => {
      const label: AucWalletLabel = wallet.label as AucWalletLabel;
      const walletConfig: AucWalletConfigMap = initWallets.get(label);

      if (initWallets.has('injected') || !!walletConfig) {
        this._walletsMap.set(
          label,
          {
            label,
            icon: initWallets.get(label)?.icon ?? AucWalletsIcons[label] ?? '',
            active: (state.wallets ?? []).findIndex((el: WalletState) => el.label === wallet.label) !== -1,
            needToInstall: false,
            position: walletConfig?.position ?? initWallets.get('injected')?.position ?? initWallets.size + 1
          });
      }
    });

    initWallets.forEach((wallet: AucWalletConfigMap, key: string) => {
      const label: AucWalletLabel = wallet.label as AucWalletLabel;

      if (!this._walletsMap.has(label) && key !== 'injected') {
        this._walletsMap.set(
          label,
          {
            label,
            icon: wallet.icon ?? AucWalletsIcons[label] ?? '',
            active: false,
            needToInstall: true,
            position: wallet.position
          }
        );
      }
    });

    (state?.walletModules ?? [])
      .forEach(async (wallet: WalletModule) => {
        const aucWallet: AucConnectWalletItem = this._walletsMap.get(wallet.label as AucWalletLabel);

        if (!aucWallet || !!aucWallet.icon) {
          return;
        }

        const icon = await wallet.getIcon();

        this._walletsMap.set(
          aucWallet.label,
          {
            ...aucWallet,
            icon
          }
        );

        this._cdr.detectChanges();
      });

    this.data.service.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.wallets
          .forEach((wallet: AucConnectWalletItem) => {
            this._walletsMap.set(
              wallet.label as AucWalletLabel,
              {
                ...wallet,
                active: (res.state.wallets ?? [])
                  .findIndex((el: WalletState) => el.label === wallet.label) !== -1
              }
            );

            this._cdr.detectChanges();
          });
      });
  }

  /** @internal */
  public connect(wallet: AucConnectWalletItem): void {
    if (!wallet?.label) {
      console.error(`Can't find selected wallet`);
    }

    if (wallet.needToInstall) {
      const url: string = this.data.service.initializedWalletsMap.get(wallet.label)?.walletUrl
        ?? AucWalletsLinks[wallet.label] ?? null;

      if (url) {
        this._installWalletHelperService.redirectTo$.next(url);
      } else {
        console.error(`Can't find the wallet ${wallet.label}`);
      }

      this.close(null);

      return;
    }

    this.close(wallet.active ? null : wallet.label);
  }

  /** @internal */
  close(val: AucWalletLabel | null = null) {
    this._dialogRef.close(val);
  }
}
