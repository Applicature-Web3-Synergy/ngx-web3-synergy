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

import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig } from '../dropdown-menu';
import { AucWalletConnectService } from '../services';
import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';
import { AucAccountData, AucAccountOption } from './interfaces';


@Component({
  selector: 'auc-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: [ './account-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountButtonComponent implements OnInit {
  /**
   * {@link account} - It's an `@Input()` parameter. <br>
   * User account related information. <br>
   * Required parameter.
   */
  @Input()
  public account!: AucAccountData;

  /**
   * {@link options} - It's an `@Input()` parameter. <br>
   * List of options in popover. <br>
   * It's an optional parameter.
   */
  @Input()
  public options: AucAccountOption[] = [];

  /**
   * {@link size} - It's an `@Input()` parameter. <br>
   * Sets size of the avatar. <br>
   * It's an optional parameter. The default value is 40.
   */
  @Input()
  public size: number = 40;

  /**
   * {@link accountDropdownConfig} - It's an `@Input()` parameter. <br>
   * You can customize dropdown position and overlay. <br>
   * This is an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: AUC_POSITIONS.BELOW,
   *     horizontal: AUC_POSITIONS.BEFORE
   *   }
 *   }
   */
  @Input() accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  /**
   * {@link optionEmitter} - It's an `@Output()` parameter. <br>
   * Emits selected option from the list.
   */
  @Output('optionClick')
  public optionEmitter: EventEmitter<AucAccountOption> = new EventEmitter<AucAccountOption>();

  public isOptionsOpen: boolean = false;
  public accountAddress!: string;
  public disconnectBtnColor: AsColorGroup = AS_COLOR_GROUP.RED;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this._sub.add(
      this._walletConnectService.accountsChanged$
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];

          this._closeOptions();
        }),
    );
  }

  public setOpened(opened: boolean): void {
    this.isOptionsOpen = opened;
  }

  public onOptionClick(option: AucAccountOption): void {
    this._closeOptions();

    this.optionEmitter.emit(option);
  }

  public onChangeWalletProviderClick(): void {
    this._closeOptions();

    this._walletConnectService.connectWallet(true)
      .subscribe();
  }

  public onDisconnectClick(): void {
    this._closeOptions();

    this._walletConnectService.disconnectWallet()
      .subscribe();
  }

  private _closeOptions() {
    this.setOpened(false);
    this._cdr.markForCheck();
  }
}