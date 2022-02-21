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

import { Ethereum, NetworkOption } from '../interfaces';

import { APPLICATURE_POSITIONS } from '../enums';
import { ApplicatureDropdownConfig } from '../applicature-dropdown-menu';
import { WalletConnectService } from '../services';


@Component({
  selector: 'applicature-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkDropdownComponent implements OnInit, OnChanges {
  @Input()
  public networkOptions!: NetworkOption[];

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
  public currentNetwork!: NetworkOption;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

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
        }),
    );
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    this.currentNetwork = (this.networkOptions || []).find(n => n.isActive);
  }

  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
  }

  public onNetworkOptionClick(option: NetworkOption): void {
    this.setOpened(false);

    if (!option?.chainId) {
      console.error(`Cant find selected network`);

      return;
    }

    this._walletConnectService.switchEthereumChain(option.chainId)
      .subscribe();
  }

}
