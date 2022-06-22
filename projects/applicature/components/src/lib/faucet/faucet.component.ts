import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { catchError, Observable, of } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AbiItem } from 'web3-utils';
import { ContractOptions, Contract } from 'web3-eth-contract';

import { AUC_BUTTON_APPEARANCE } from '../button';
import { BaseSubscriber } from '../helpers';
import { AucWalletConnectService } from '../connect/services';
import ERC20 from '../smart-contracts/ERC20.json'


@Component({
  selector: 'auc-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucFaucetComponent extends BaseSubscriber implements OnInit {

  /** Color Scheme button */
  public COLORS = AS_COLOR_GROUP;
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;

  /** @internal */
  private ERC20Json: AbiItem[] = ERC20 as AbiItem[];

  /** @internal */
  public account: string;

  /** @internal */
  public hasPending: boolean = false;

  /**
   * Sets icon of the token. <br>
   * Required parameter.
   */
  @Input()
  public iconToken!: string;

  /**
   * Sets name of the token. <br>
   * Required parameter.
   */
  @Input()
  public tokenSymbol!: string;

  /**
   * Sets token smart contract address of the faucet. <br>
   * Required parameter.
   */
  @Input()
  public contract!: string;

  /**
   * Sets token smart contract address of the faucet. <br>
   * Required parameter.
   */
  @Input()
  public amount!: string;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService
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

    if (!connectionState.connected) {
      this.connectWallet();

      return;
    }

    this.hasPending = true;
    this._cdr.markForCheck();

    new Observable<void>((observer) => {
      if (!this.contract || !this.account) {
        observer.next(null);
        observer.complete();

        return;
      }

      const contract: Contract = this.getContract(this.ERC20Json, this.contract);
      contract.methods.mint(this.account, this.amount)
        .send({from: this.account})
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
}
