import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subscription, timer } from 'rxjs';
import { CHAIN_ID_TO_TYPE_MAP, MAINNET_CHAIN_ID } from '../constants';
import { TransactionStatus } from '../enums';
import { Ethereum, EtherscanTransactionResponse } from '../interfaces';
import { WalletService } from './wallet.service';

export interface EtherscanTransactionLocal {
  name: string,
  hash: string;
  status: TransactionStatus;
  etherscanUrl: string
  viewed: boolean
}

@Injectable()
export class TransactionService {
  private _transactionsChanged$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _transactions: EtherscanTransactionLocal[] = [];
  private _dispose: Subscription;

  public get transactionsChanged$(): Observable<EtherscanTransactionLocal[]> {
    return this._transactionsChanged$.asObservable();
  }

  constructor(
    private _http: HttpClient,
    private _metamaskService: WalletService,
  ) {
  }

  public init(): void {
    this.dispose();

    this._transactions = JSON.parse(localStorage.getItem(this._getStorageKey())) || [];

    this._refreshTransactions();

    this._dispose = timer(1, 10000)
      .subscribe(() => this._pingTransactionsStatus());
  }

  public dispose(): void {
    if (this._dispose && !this._dispose.closed) {
      this._dispose.unsubscribe();
    }
  }

  public saveTransaction(name: string, hash: string, status: TransactionStatus = TransactionStatus.Pending): void {
    this._removeFromTransactions(hash);

    this._transactions = [
      { name, hash, status, viewed: false, etherscanUrl: undefined },
      ...this._transactions,
    ];

    const { chainId } = (window as any).ethereum as Ethereum;

    this._transactions.forEach((tx) => {
      tx.etherscanUrl = `https://${CHAIN_ID_TO_TYPE_MAP[chainId]}.etherscan.io/tx/${tx.hash}`;
    });

    if (this._transactions.length === 100) {
      this._transactions = this._transactions.slice(0, 100);
    }

    this._refreshTransactions();
  }

  public markAsViewed(): void {
    this._transactions = this._transactions
      .map((tx) => ({ ...tx, viewed: true }));

    this._refreshTransactions();
  }

  public clearTransactions(): void {
    this._transactions = [];

    this._refreshTransactions();
  }

  public getRemoteTransactions(address: string, chainId: string): Observable<EtherscanTransactionResponse> {
    const etherscanSubdomain = chainId === MAINNET_CHAIN_ID ? 'api' : `api-${CHAIN_ID_TO_TYPE_MAP[chainId]}`;
    const etherscanUrl = `https://${etherscanSubdomain}.etherscan.io`;

    let params = new HttpParams();
    params = params.set('module', 'account');
    params = params.set('action', 'txlist');
    params = params.set('address', address);
    params = params.set('startblock', 0);
    params = params.set('endblock', 99999999);
    params = params.set('sort', 'desc');
    params = params.set('page', 1);
    params = params.set('offset', 100);

    return this._http.get<EtherscanTransactionResponse>(`${etherscanUrl}/api`, { params })
      .pipe(
        map((data) => {
          if (data.result && Array.isArray(data.result)) {
            data.result.forEach((tx) => {
              tx.etherscanUrl = `https://${CHAIN_ID_TO_TYPE_MAP[chainId]}.etherscan.io/tx/${tx.hash}`;
            });
          }

          return data;
        })
      );
  }

  private _pingTransactionsStatus(): void {
    const eth = this._metamaskService.web3.eth;

    this._transactions.forEach(async (tx) => {
      try {
        const transactionReceipt = await eth.getTransactionReceipt(tx.hash);

        if (transactionReceipt) {
          tx.status = Boolean(transactionReceipt.status) ? TransactionStatus.Success : TransactionStatus.Fail;
        } else if (!(await eth.getTransaction(tx.hash))) {
          this._removeFromTransactions(tx.hash);
        }
      } catch (error) {
        this._removeFromTransactions(tx.hash);
      }
    });

    this._refreshTransactions();
  }

  private _getStorageKey(): string {
    const { chainId, selectedAddress } = (window as any).ethereum as Ethereum;

    return `NGX_WEB3_COMPONENTS_${selectedAddress}_${chainId}`.toUpperCase();
  }

  private _refreshTransactions(): void {
    localStorage.setItem(this._getStorageKey(), JSON.stringify(this._transactions));

    this._transactionsChanged$.next(this._transactions.slice());
  }

  private _removeFromTransactions(hash: string): void {
    this._transactions = this._transactions.filter((tx) => tx.hash !== hash);
  }
}
