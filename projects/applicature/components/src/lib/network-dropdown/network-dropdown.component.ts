import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Input,
  HostListener,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { Ethereum, NetworkOption } from '../interfaces';
import { WalletConnectService } from '../services/wallet-connect.service';

@Component({
  selector: 'applicature-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: ['./network-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkDropdownComponent implements OnInit, OnChanges {
  @Input()
  public networkOptions!: NetworkOption[];

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

  public async onNetworkOptionClick(option: NetworkOption): Promise<void> {
    try {
      await this._walletConnectService.switchEthereumChain(option.chainId);
    } catch (error) {

    }
  }

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    const element = this._elementRef.nativeElement;

    if (this.isOptionsOpen && !element.contains(target)) {
      this.isOptionsOpen = false;
      this._cdr.markForCheck();
    }
  }
}
