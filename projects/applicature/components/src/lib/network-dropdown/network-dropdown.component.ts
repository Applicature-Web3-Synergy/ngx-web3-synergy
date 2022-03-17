import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AucNetworkOption, Ethereum } from '../interfaces';

import { APPLICATURE_POSITIONS } from '../enums';
import { ApplicatureDropdownConfig } from '../applicature-dropdown-menu';
import { WalletConnectService } from '../services';
import { ApplicatureDialogService } from '../applicature-dialog';
import { AucNoNetworkConfigComponent, AucNoNetworkConfigDialogDataI } from './no-network-config';


@Component({
  selector: 'applicature-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkDropdownComponent implements OnInit, OnChanges {
  @Input()
  public networkOptions!: AucNetworkOption[];

  @Input() networkDropdownConfig: ApplicatureDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: APPLICATURE_POSITIONS.BELOW,
      horizontal: APPLICATURE_POSITIONS.AFTER
    }
  }

  public isWrongNetwork: boolean = false;
  public isOptionsOpen: boolean = false;
  public currentNetwork!: AucNetworkOption;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialogService: ApplicatureDialogService
  ) {}

  public ngOnInit(): void {
    this._sub.add(
      this._walletConnectService.networkChanged$
        .pipe(
          filter((networkId) => Number.isSafeInteger(networkId)),
        )
        .subscribe(() => {
          const { chainId } = (window as any).ethereum as Ethereum;

          this.networkOptions = (this.networkOptions || []).map((network) => {
            return { ...network, isActive: network.chainId === chainId };
          });

          this.isWrongNetwork = !Boolean((this.networkOptions || []).find(n => n.chainId === chainId));

          this.ngOnChanges();

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
                text: `Please add it by yourself.`
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

  public ngOnChanges(changes?: SimpleChanges): void {
    this.currentNetwork = (this.networkOptions || []).find(n => n.isActive);
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
