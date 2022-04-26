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
import { Subscription } from 'rxjs';

import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';

import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig } from '../dropdown-menu';
import { AucWalletConnectService } from '../services';
import { AucAccountData, AucAccountOption } from './interfaces';


@Component({
  selector: 'auc-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: [ './account-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountButtonComponent implements OnInit {
  /**
   * User account related information. <br>
   * Required parameter.
   */
  @Input()
  public account!: AucAccountData;

  /**
   * List of options in popover. <br>
   * It's an optional parameter.
   */
  @Input()
  public options?: AucAccountOption[] = [];

  /**
   * Sets size of the avatar. <br>
   * It's an optional parameter. <br>
   * The default value is 40.
   */
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
   *     vertical: AUC_POSITIONS.BELOW,
   *     horizontal: AUC_POSITIONS.BEFORE
   *   }
   * }
   */
  @Input()
  public accountDropdownConfig?: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  /** Emits selected option from the list. */
  @Output('optionClick')
  public optionEmitter: EventEmitter<AucAccountOption> = new EventEmitter<AucAccountOption>();

  /** @internal */
  public isOptionsOpen: boolean = false;

  /** @internal */
  public accountAddress!: string;

  /** @internal */
  public disconnectBtnColor: AsColorGroup = AS_COLOR_GROUP.RED;

  /** @internal */
  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  /** @internal */
  public ngOnInit(): void {
    this._sub.add(
      this._walletConnectService.accountsChanged$
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];

          this._closeOptions();
        }),
    );
  }

  /** Open account dropdown menu. */
  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
  }

  /** Emit {@link optionEmitter} event. */
  public onOptionClick(option: AucAccountOption): void {
    this._closeOptions();

    this.optionEmitter.emit(option);
  }

  /** Connect wallet. */
  public onChangeWalletProviderClick(): void {
    this._closeOptions();

    this._walletConnectService.connectWallet(true)
      .subscribe();
  }

  /** Disconnect wallet. */
  public onDisconnectClick(): void {
    this._closeOptions();

    this._walletConnectService.disconnectWallet()
      .subscribe();
  }

  /** @internal */
  private _closeOptions() {
    this.setOpened(false);
    this._cdr.markForCheck();
  }
}
