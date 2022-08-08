import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { WalletModule } from '@web3-onboard/common/dist/types';
import { WalletState } from '@web3-onboard/core';

import { W3sDialogConfig, W3sDialogRef } from '../../../dialog';
import {
  W3sWalletConfigMap,
  W3sWalletLabel,
  W3sWalletsToInitLabel
} from '../../services';
import { W3sConnectDialogData, W3sConnectWalletItem } from './interfaces';
import { W3sInstallWalletHelperService, BaseSubscriber } from '../../../helpers';
import { W3sWalletsIcons, W3sWalletsLinks } from '../../constants';


@Component({
  selector: 'w3s-connect-modal',
  templateUrl: './connect-modal.component.html',
  styleUrls: [ './connect-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sConnectModalComponent extends BaseSubscriber {
  /** @internal */
  public data: W3sConnectDialogData;
  /** @internal */
  private _walletsMap: Map<W3sWalletLabel, W3sConnectWalletItem> = new Map<W3sWalletLabel, W3sConnectWalletItem>();

  /** @internal */
  public get wallets(): W3sConnectWalletItem[] {
    return [ ...(this._walletsMap.values() || []) ]
      .sort((a: W3sConnectWalletItem, b: W3sConnectWalletItem) => a.position - b.position);
  }

  constructor(private _config: W3sDialogConfig<W3sConnectDialogData>,
              private _cdr: ChangeDetectorRef,
              private _dialogRef: W3sDialogRef<W3sWalletLabel | null>,
              private _installWalletHelperService: W3sInstallWalletHelperService) {
    super();

    this.data = this._config?.data;
    const state = this.data.service.onboard.state.get();
    const initWallets: Map<W3sWalletsToInitLabel, W3sWalletConfigMap> = this.data.service.initializedWalletsMap;

    (state?.walletModules ?? []).forEach((wallet: WalletModule) => {
      const label: W3sWalletLabel = wallet.label as W3sWalletLabel;
      const walletConfig: W3sWalletConfigMap = initWallets.get(label);

      if (initWallets.has('injected') || !!walletConfig) {
        this._walletsMap.set(
          label,
          {
            label,
            icon: initWallets.get(label)?.icon ?? W3sWalletsIcons[label] ?? '',
            active: (state.wallets ?? []).findIndex((el: WalletState) => el.label === wallet.label) !== -1,
            needToInstall: false,
            position: walletConfig?.position ?? initWallets.get('injected')?.position ?? initWallets.size + 1
          });
      }
    });

    initWallets.forEach((wallet: W3sWalletConfigMap, key: string) => {
      const label: W3sWalletLabel = wallet.label as W3sWalletLabel;

      if (!this._walletsMap.has(label) && key !== 'injected') {
        this._walletsMap.set(
          label,
          {
            label,
            icon: wallet.icon ?? W3sWalletsIcons[label] ?? '',
            active: false,
            needToInstall: true,
            position: wallet.position
          }
        );
      }
    });

    (state?.walletModules ?? [])
      .forEach(async (wallet: WalletModule) => {
        const aucWallet: W3sConnectWalletItem = this._walletsMap.get(wallet.label as W3sWalletLabel);

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
          .forEach((wallet: W3sConnectWalletItem) => {
            this._walletsMap.set(
              wallet.label as W3sWalletLabel,
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
  public connect(wallet: W3sConnectWalletItem): void {
    if (!wallet?.label) {
      console.error(`Can't find selected wallet`);
    }

    if (wallet.needToInstall) {
      const url: string = this.data.service.initializedWalletsMap.get(wallet.label)?.walletUrl
        ?? W3sWalletsLinks[wallet.label] ?? null;

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
  close(val: W3sWalletLabel | null = null) {
    this._dialogRef.close(val);
  }
}
