import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUC_TRANSACTION_STATUS } from '../renamed/enums';
import { CHAIN_ID_TO_TYPE_MAP, MAINNET_CHAIN_ID } from '../renamed/helpers/network';
import { AucEthereum, AucEtherscanTransactionLocalStorage, AucEtherscanTransactionResponse } from '../renamed/interfaces';
import { WalletConnectService } from './wallet-connect';


const APPLICATURE_ETHERSCAN_TRANSACTIONS = 'APPLICATURE_ETHERSCAN_TRANSACTIONS';
const APPLICATURE_ETHERSCAN_INTERVAL = 10000;

@Injectable()
export class TransactionService {
  private _transactionsChanged$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _transactions: AucEtherscanTransactionLocalStorage[] = [];
  private _dispose: Subscription;

  public get transactionsChanged$(): Observable<AucEtherscanTransactionLocalStorage[]> {
    return this._transactionsChanged$.asObservable();
  }

  constructor(
    private _http: HttpClient,
    private _walletConnectService: WalletConnectService,
  ) {
  }

  public refreshTransactions(): void {
    this.dispose();

    this._transactions = JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || [];

    this._refreshTransactions();

    this._dispose = timer(0, APPLICATURE_ETHERSCAN_INTERVAL)
      .subscribe(() => this._pingTransactionsStatus());
  }

  public dispose(): void {
    if (this._dispose && !this._dispose.closed) {
      this._dispose.unsubscribe();
    }
  }

  public saveTransaction(name: string,
                         hash: string,
                         status: AUC_TRANSACTION_STATUS = AUC_TRANSACTION_STATUS.PENDING
  ): void {
    this._removeFromTransactions(hash);

    this._transactions = [
      {
        name,
        hash,
        status,
        viewed: false,
        etherscanUrl: undefined,
      },
      ...this._transactions,
    ];

    const { chainId } = (window as any).ethereum as AucEthereum;

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

  public getRemoteTransactions(address: string, chainId: string): Observable<AucEtherscanTransactionResponse> {
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

    return this._http.get<AucEtherscanTransactionResponse>(`${etherscanUrl}/api`, { params })
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
    const eth = this._walletConnectService.web3.eth;

    this._transactions.forEach(async (tx) => {
      try {
        const transactionReceipt = await eth.getTransactionReceipt(tx.hash);

        if (transactionReceipt) {
          tx.status = Boolean(transactionReceipt.status) ? AUC_TRANSACTION_STATUS.SUCCESS : AUC_TRANSACTION_STATUS.FAIL;
        } else if (!(await eth.getTransaction(tx.hash))) {
          this._removeFromTransactions(tx.hash);
        }
      } catch (error) {
        this._removeFromTransactions(tx.hash);
      }
    });

    this._refreshTransactions();
  }

  private _getLocalStorageKey(): string {
    const { chainId, selectedAddress } = (window as any).ethereum as AucEthereum;

    return `${APPLICATURE_ETHERSCAN_TRANSACTIONS}[${selectedAddress}, ${chainId}]`.toUpperCase();
  }

  private _refreshTransactions(): void {
    localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(this._transactions));

    this._transactionsChanged$.next(this._transactions.slice());
  }

  private _removeFromTransactions(hash: string): void {
    this._transactions = this._transactions.filter((tx) => tx.hash !== hash);
  }
}
