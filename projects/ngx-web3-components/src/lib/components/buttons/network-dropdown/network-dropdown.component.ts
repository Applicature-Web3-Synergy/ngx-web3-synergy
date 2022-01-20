import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges, OnDestroy, OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { Ethereum, NetworkOption } from '../../../interfaces';
import { WalletService } from '../../../services';

@Component({
  selector: 'network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: ['./network-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkDropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public options!: NetworkOption[];

  @Input()
  public disabled: boolean = false;

  @Input()
  public wrongNetwork: boolean = false;

  @Output('onChange')
  public onChangeEmitter: EventEmitter<NetworkOption> = new EventEmitter<NetworkOption>();

  public get classNames(): { [el: string]: boolean } {
    return {
      ['wcl-network-dropdown']: true,
    };
  }

  public currentNetwork!: NetworkOption | undefined;

  public opened: boolean = false;

  private _sub: Subscription = new Subscription();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletService: WalletService,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this._sub.add(
      this._walletService.networkChanged$
        .pipe(
          filter((networkId) => Number.isSafeInteger(networkId)),
        )
        .subscribe(() => {
          const { chainId } = (window as any).ethereum as Ethereum;

          this.options = this.options.map((network) => {
            return { ...network, isActive: network.chainId === chainId };
          });

          this.ngOnChanges();

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    this.currentNetwork = (this.options || []).find(n => n.isActive);
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public onClick(option: NetworkOption): void {
    if (this.disabled) {
      return;
    }

    this.opened = false;
    this.onChangeEmitter.emit(option);
  }

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (this.opened && !this._elementRef.nativeElement.contains(target)) {
      this.opened = false;
    }
  }
}
