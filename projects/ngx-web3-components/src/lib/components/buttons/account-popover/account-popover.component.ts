import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface AccountOption {
  label: string;
  id: number;
}

@Component({
  selector: 'account-popover',
  templateUrl: './account-popover.component.html',
  styleUrls: ['./account-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPopoverComponent {
  @Input()
  public account!: { icon?: string; address: string; name: string; };

  @Input()
  public options!: AccountOption[];

  @Output('changeWalletProvider')
  public changeWalletProviderEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output('disconnect')
  public disconnectEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output('optionClick')
  public optionEmitter: EventEmitter<AccountOption> = new EventEmitter<AccountOption>();

  public opened: boolean = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public onChangeWalletProviderClick(): void {
    this.opened = false;
    this.changeWalletProviderEmitter.emit();
  }

  public onDisconnectClick(): void {
    this.opened = false;
    this.disconnectEmitter.emit();
  }

  public onOptionClick(option: AccountOption): void {
    this.opened = false;
    this.optionEmitter.emit(option);
  }

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (this.opened && !this._elementRef.nativeElement.contains(target)) {
      this.opened = false;
    }
  }
}
