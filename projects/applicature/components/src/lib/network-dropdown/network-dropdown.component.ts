import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { Chain } from '@web3-onboard/common/dist/types'
import { AS_COLOR_GROUP } from '@applicature/styles';

import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig } from '../dropdown-menu';
import { AucWalletConnectService } from '../services';
import { AucDialogService } from '../dialog';
import { BaseSubscriber } from '../helpers';


@Component({
  selector: 'auc-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucNetworkDropdownComponent extends BaseSubscriber implements OnInit {
  /**
   * Customize dropdown <br>
   * It's an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: AUC_POSITIONS.BELOW,
   *     horizontal: AUC_POSITIONS.AFTER
   *   }
   * }
   */
  @Input()
  public networkDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  public isWrongNetwork: boolean = false;

  /** Current active network */
  public currentNetwork: Chain;

  /** Supported networks */
  public chainsList: Chain[] = [];

  /** @internal */
  public isOptionsOpen: boolean = false;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialogService: AucDialogService
  ) {
    super();

    const connectionState = this._walletConnectService.connectionState;

    if (!connectionState.connected) {
      this.chainsList = [];

      return;
    }

    this.chainsList = connectionState.state.chains;
  }

  /** @internal */
  public ngOnInit(): void {
    this._walletConnectService.chainChanged$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        this.currentNetwork = this.chainsList.find((chain: Chain) => chain.id === chainId) || null;
        this.isWrongNetwork = !this.currentNetwork;
        this.isOptionsOpen = false;
        this._cdr.detectChanges();
      });
  }

  /** Open networks dropdown menu. */
  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
    this._cdr.markForCheck();
  }

  /**
   * Switch to selected network. <br>
   * Hide Network dropdown menu. <br>
   * @param option - network to switch.
   */
  public switchChain(chain: Chain): void {
    this.setOpened(false);

    this._walletConnectService.onboard.setChain({ chainId: chain.id })
      .then(() => this.setOpened(false));
  }

}
