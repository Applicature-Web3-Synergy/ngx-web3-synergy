import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { catchError, Observable, of } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AbiItem } from 'web3-utils';
import { ContractOptions, Contract } from 'web3-eth-contract';

import { W3S_BUTTON_APPEARANCE } from '../button';
import { BaseSubscriber, w3sToWei } from '../helpers';
import { W3sConnectionState, W3sWalletConnectService } from '../connect';
import ERC20 from '../smart-contracts/ERC20.json';
import { MetamaskIcon } from '../connect/constants/icons/metamask';
import { W3sFaucetConfig } from './interfaces';

// eslint-disable @typescript-eslint/no-unsafe-call
@Component({
  selector: 'w3s-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: [ './faucet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sFaucetComponent extends BaseSubscriber implements OnInit {

  /** Color Scheme button */
  public COLORS = AS_COLOR_GROUP;
  public BUTTON_APPEARANCE = W3S_BUTTON_APPEARANCE;

  /** @internal */
  private ERC20Json: AbiItem[] = ERC20 as AbiItem[];

  /** @internal */
  public account: string;

  /** @internal */
  public hasPending = false;

  /** @internal */
  public metamaskIcon = MetamaskIcon;

  /** @internal */
  public showAddTokenBtn = false;

  /**
   * Amount of tokens to faucet.<br>
   * Required parameter.
   */
  @Input()
  public amount!: number;

  /**
   * Sets appearance. <br>
   * Optional parameter. <br>
   * Default value row.
   */
  @Input()
  public appearance: 'row' | 'column' = 'row';

  /**
   * Show add token to wallet icon. <br>
   * Optional parameter. <br>
   * Default value true.
   */
  @Input()
  public showAddTokenToWallet = true;

  /**
   * Sets faucet configuration. <br>
   * Required parameter.
   */
  @Input() config!: W3sFaucetConfig;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService
  ) {
    super();
  }

  /** @internal */
  ngOnInit(): void {
    this._walletConnectService.accounts$
      .pipe(takeUntil(this.notifier))
      .subscribe((accounts: string[]) => {
        this.account = (accounts || [])[0];
        this._cdr.markForCheck();
      });

    this._walletConnectService.connectionState$
      .subscribe((connectionState: W3sConnectionState) => {
        this.showAddTokenBtn = connectionState.state?.wallets[0]?.label === "MetaMask";
      });
  }

  /** @internal */
  private getContract(abi: AbiItem[] | AbiItem, contractAddress: string, contractOptions: ContractOptions = {}): Contract | null {
    return this._walletConnectService.web3 && abi && contractAddress
      ? new this._walletConnectService.web3.eth.Contract(abi, contractAddress, contractOptions)
      : null;
  }

  /** Get coins on the wallet*/
  public mint(): void {
    const connectionState = this._walletConnectService.connectionState;

    if ( !connectionState.connected ) {
      this.connectWallet();

      return;
    }

    this.hasPending = true;
    this._cdr.markForCheck();

    new Observable<void>((observer) => {
      const contractAddress = this.config?.address;

      if ( !contractAddress || !this.account ) {
        observer.next(null);
        observer.complete();

        return;
      }

      const contract: Contract = this.getContract(this.ERC20Json, contractAddress);
      contract.methods.mint(this.account, w3sToWei(this.amount, this.config.decimals))
        .send({ from: this.account })
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
      .pipe(
        catchError(() => of(null)),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this.hasPending = false;
        this._cdr.markForCheck();
      });
  }

  /** Show modal for connecting to wallets */
  public connectWallet(): void {
    this._walletConnectService.connect()
      .pipe(takeUntil(this.notifier))
      .subscribe();
  }

  public async addTokenToWallet(): Promise<void> {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      await this._walletConnectService.web3.givenProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: this.config,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
