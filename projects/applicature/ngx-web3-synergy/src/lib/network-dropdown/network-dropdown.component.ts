import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { Chain } from '@web3-onboard/common/dist/types';
import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';

import { W3S_POSITIONS } from '../enums';
import { W3sDropdownConfig } from '../dropdown-menu';
import { W3sWalletConnectService } from '../connect';
import { W3sDialogService } from '../dialog';
import { BaseSubscriber } from '../helpers';
import { W3sSelectedNetwork } from './interfaces';


@Component({
  selector: 'w3s-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sNetworkDropdownComponent extends BaseSubscriber implements OnInit, OnChanges {
  /**
   * Customize dropdown <br>
   * It's an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: W3S_POSITIONS.BELOW,
   *     horizontal: W3S_POSITIONS.AFTER
   *   }
   * }
   */
  @Input()
  public networkDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: W3S_POSITIONS.BELOW,
      horizontal: W3S_POSITIONS.AFTER
    }
  };

  /** Customize button color schema.</br>
   * I's an optional parameter.
   */
  @Input()
  public btnStyle?: AsColorGroup = AS_COLOR_GROUP.WHITE;

  /** Sets bordered style to Dropdown button.</br>
   * I's an optional parameter.</br>
   * The default value is false.
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input()
  public bordered: boolean = false;

  /** Emits when chainChanged. */
  @Output()
  public networkSelected: EventEmitter<W3sSelectedNetwork> = new EventEmitter<W3sSelectedNetwork>();

  @HostBinding('class.w3s-full-width') private _fullWidth = true;

  /** @internal */
  public isWrongNetwork = false;

  /** Current active network */
  public currentNetwork: Chain;

  /** Supported networks */
  public chainsList: Chain[] = [];

  /** @internal */
  public isOptionsOpen = false;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialogService: W3sDialogService
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
    this._walletConnectService.chain$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        this.currentNetwork = this.chainsList.find((chain: Chain) => chain.id === chainId) || null;
        this.isWrongNetwork = !this.currentNetwork;
        this.networkSelected.emit({
          chainId,
          valid: !this.isWrongNetwork
        });
        this.isOptionsOpen = false;
        this._cdr.detectChanges();
      });
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.networkDropdownConfig.firstChange) {
      this._fullWidth = !!this.networkDropdownConfig?.fullwidth;
    }
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
