import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AucNetworkOption } from '../interfaces';
import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig } from '../dropdown-menu';
import { AucWalletConnectService } from '../../services';
import { AucDialogService } from '../dialog';
import { AucNoNetworkConfigComponent, AucNoNetworkConfigDialogDataI } from './no-network-config';


@Component({
  selector: 'auc-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucNetworkDropdownComponent implements OnInit {
  /**
   * {@link networkDropdownConfig} - It's an `@Input()` parameter.
   * You can customize dropdown position and overlay.
   * This is an optional parameter.
   * The default value is
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

  /**
   * List of the supported networks. Gets from this._walletConnectService.supportedNetworks
   */
  public get networkOptions(): AucNetworkOption[] {
    return this._walletConnectService.supportedNetworks;
  };

  public isWrongNetwork: boolean = false;
  public isOptionsOpen: boolean = false;
  public currentNetwork!: AucNetworkOption;
  public COLORS = AS_COLOR_GROUP;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialogService: AucDialogService
  ) {}

  public ngOnInit(): void {
    this._sub.add(
      this._walletConnectService.selectedNetwork$
        .subscribe((network: AucNetworkOption) => {
          this.currentNetwork = network;
          this.isWrongNetwork = !this.currentNetwork;
          this.isOptionsOpen = false;

          this._cdr.markForCheck();
        })
    );

    this._sub.add(
      this._walletConnectService.cantFindAddingNetwork$
        .subscribe(() => {
          this._dialogService.open<AucNoNetworkConfigComponent, AucNoNetworkConfigDialogDataI>(
            AucNoNetworkConfigComponent,
            {
              data: {
                title: `Metamask can't find this network.`,
                text: `Please add this network by yourself.`
              },
              width: '100%',
              maxWidth: '420px',
              dialogClass: 'auc-no-network-config-dialog',
              overlay: {
                closeByClick: true,
                overlayClass: 'auc-no-network-config-dialog-overlay',
              },
              panel: {
                panelClass: 'auc-no-network-config-dialog-panel'
              },
            }
          );
        })
    )
  }

  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
  }

  public onNetworkOptionClick(option: AucNetworkOption): void {
    this.setOpened(false);

    if (!option?.chainId) {
      console.error(`Cant find selected network`);

      return;
    }

    this._sub.add(
      this._walletConnectService.switchEthereumChain(option.chainId, option.chainParams)
        .subscribe()
    )
  }

}
