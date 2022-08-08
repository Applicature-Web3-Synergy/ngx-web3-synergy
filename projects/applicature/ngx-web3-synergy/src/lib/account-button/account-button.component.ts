import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';

import { W3S_POSITIONS } from '../enums';
import { W3sDropdownConfig } from '../dropdown-menu';
import { W3sWalletConnectService } from '../connect';
import { W3sAccountData, W3sAccountOption } from './interfaces';
import { BaseSubscriber } from '../helpers';


@Component({
  selector: 'w3s-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sAccountButtonComponent extends BaseSubscriber implements OnInit {
  /**
   * User account related information. <br>
   * Required parameter.
   */
  @Input()
  public account!: W3sAccountData;

  /**
   * List of options in popover. <br>
   * It's an optional parameter.
   */
  @Input()
  public options?: W3sAccountOption[] = [];

  /**
   * Sets size of the avatar. <br>
   * It's an optional parameter. <br>
   * The default value is 40.
   */
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input()
  public size: number = 40;

  /**
   * Customize account dropdown. <br>
   * It's an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: W3S_POSITIONS.BELOW,
   *     horizontal: W3S_POSITIONS.BEFORE
   *   }
   * }
   */
  @Input()
  public accountDropdownConfig?: W3sDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: W3S_POSITIONS.BELOW,
      horizontal: W3S_POSITIONS.BEFORE
    }
  }

  /** Emits selected option from the list. */
  @Output()
  public optionClicked: EventEmitter<W3sAccountOption> = new EventEmitter<W3sAccountOption>();

  /** @internal */
  public isOptionsOpen = false;

  /** @internal */
  public accountAddress!: string;

  /** @internal */
  public disconnectBtnColor: AsColorGroup = AS_COLOR_GROUP.RED;

  /** @internal */
  public get dropdownConfig(): W3sDropdownConfig {
    return {
      ...this.accountDropdownConfig,
      class: ['w3s-account-button-dropdown', ...(this.accountDropdownConfig.class ?? [])]
    }

  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
    super();
  }

  /** @internal */
  public ngOnInit(): void {
    this._walletConnectService.accounts$
      .pipe(takeUntil(this.notifier))
      .subscribe((accounts) => {
        this.accountAddress = accounts?.length && accounts[0];

        this._closeOptions();
      });
  }

  /** Open account dropdown menu. */
  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
  }

  /** Emit {@link optionClicked} event. */
  public optionClick(option: W3sAccountOption): void {
    this._closeOptions();

    this.optionClicked.emit(option);
  }

  /** Connect wallet. */
  public onChangeWalletProviderClick(): void {
    this._closeOptions();

    this._walletConnectService.connect()
      .pipe(takeUntil(this.notifier))
      .subscribe();
  }

  /** Disconnect wallet. */
  public disconnectClick(): void {
    this._closeOptions();

    this._walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe();
  }

  /** @internal */
  private _closeOptions() {
    this.setOpened(false);
    this._cdr.markForCheck();
  }
}
