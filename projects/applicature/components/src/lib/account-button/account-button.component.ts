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


import { APPLICATURE_POSITIONS } from '../enums';
import { ApplicatureDropdownConfig } from '../applicature-dropdown-menu';
import { WalletConnectService } from '../services';

export interface AccountData {
  image?: string;
  name: string;
}

export interface AccountOption {
  name: string;
  id: number;
  disabled?: boolean;
}

@Component({
  selector: 'applicature-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: [ './account-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountButtonComponent implements OnInit {
  @Input()
  public account!: AccountData;

  @Input()
  public options!: AccountOption[];

  @Input()
  public size: number = 40;

  @Input() accountDropdownConfig: ApplicatureDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: APPLICATURE_POSITIONS.BELOW,
      horizontal: APPLICATURE_POSITIONS.BEFORE
    }
  }

  @Output('optionClick')
  public optionEmitter: EventEmitter<AccountOption> = new EventEmitter<AccountOption>();

  public isOptionsOpen: boolean = false;
  public accountAddress!: string;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
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

  public onOptionClick(option: AccountOption): void {
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
