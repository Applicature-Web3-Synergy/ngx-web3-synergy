import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WalletConnectService } from '../services/wallet-connect.service';

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
  styleUrls: ['./account-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountButtonComponent implements OnInit {
  @Input()
  public account!: AccountData;

  @Input()
  public options!: AccountOption[];

  @Input()
  public size: number = 40;

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

  public onOptionClick(option: AccountOption): void {
    this._closeOptions();

    this.optionEmitter.emit(option);
  }

  public async onChangeWalletProviderClick(): Promise<void> {
    this._closeOptions();

    await this._walletConnectService.connectWallet();
  }

  public onDisconnectClick(): void {
    this._closeOptions();

    this._walletConnectService.disconnectWallet();
  }

  private _closeOptions() {
    this.isOptionsOpen = false;
    this._cdr.markForCheck();
  }
}
