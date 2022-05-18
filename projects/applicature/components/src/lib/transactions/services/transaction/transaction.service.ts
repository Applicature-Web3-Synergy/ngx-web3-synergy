import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUC_SORT_DIRECTION, AUC_TRANSACTION_STATUS } from '../../../enums';
import {
  AucEthereum,
  AucEtherscanTransaction,
  AucEtherscanTransactionLocalStorage,
  AucEtherscanTransactionResponse
} from '../../../interfaces';

import { AucBlockExplorerApiUrl, AucBlockExplorerUrls } from '../../../constants';
import { AucSortDirection } from '../../../types';
import { AucWalletConnectService } from '../../../services';


const AUC_ETHERSCAN_TRANSACTIONS = 'AUC_ETHERSCAN_TRANSACTIONS';
const AUC_ETHERSCAN_INTERVAL = 10000;


@Injectable()
export class AucTransactionService {
  private _transactionsChanged$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _transactions: AucEtherscanTransactionLocalStorage[] = [];
  private _dispose: Subscription;

  /**
   * Emits when transactions change. <br>
   * You can subscribe on it.
   */
  public get transactionsChanged$(): Observable<AucEtherscanTransactionLocalStorage[]> {
    return this._transactionsChanged$.asObservable();
  }

  constructor(
    private _http: HttpClient,
    private _walletConnectService: AucWalletConnectService
  ) {
    this._transactions = JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || [];
    this._transactionsChanged$.next(this._transactions);
  }

  /**
   * Supported networks {@link BlockExplorerApiUrl}`. <br>
   * @returns API url by chainId.
   */
  static getTransactionApiUrl(chainId: string): string {
    const url: string = AucBlockExplorerApiUrl[chainId];

    if (!url) {
      throw new Error(`Can't find transaction API url. Make sure that you add blockExplorerApiUrl when init library`);
    }

    return url;
  }

  /** Refresh transactions */
  public refreshTransactions(): void {
    this.dispose();

    this._transactions = JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || [];

    this._refreshTransactions();

    this._dispose = timer(0, AUC_ETHERSCAN_INTERVAL)
      .subscribe(() => this._pingTransactionsStatus());
  }

  public dispose(): void {
    if (this._dispose && !this._dispose.closed) {
      this._dispose.unsubscribe();
    }
  }

  /** add transaction to the list */
  public saveTransaction(chainId: string,
                         name: string,
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
        explorerUrl: undefined
      },
      ...this._transactions,
    ];

    if (chainId) {
      this._transactions.forEach((tx) => {
        tx.explorerUrl = `${AucBlockExplorerUrls[chainId]}/tx/${tx.hash}`;
      });
    }

    if (this._transactions.length === 100) {
      this._transactions = this._transactions.slice(0, 100);
    }

    this._refreshTransactions();
  }

  /** Marks transactions as viewed */
  public markAsViewed(): void {
    this._transactions = this._transactions
      .map((tx: AucEtherscanTransactionLocalStorage) => ({ ...tx, viewed: true }));

    this._refreshTransactions();
  }

  /** Clear transactions list */
  public clearTransactions(): void {
    this._transactions = [];

    this._refreshTransactions();
  }

  /**
   * Gets remote transactions from blockchain. <br>
   * @param address - wallet address. <br>
   * @param chainId - 0x-prefixed hexadecimal string. <br>
   * @param page - number of the page. Uses for pagination. <br>
   * @param offset - uses for pagination.
   */
  public getRemoteTransactions(address: string,
                               chainId: string,
                               page: number = 1,
                               offset: number = 100,
                               sortDirection: AucSortDirection = AUC_SORT_DIRECTION.ASC
  ): Observable<AucEtherscanTransactionResponse> {
    try {
      const apiUrl: string = AucTransactionService.getTransactionApiUrl(chainId);

      if (!apiUrl) {
        return of(null);
      }

      let params: HttpParams = new HttpParams();
      params = params.set('module', 'account');
      params = params.set('action', 'txlist');
      params = params.set('address', address);
      params = params.set('startblock', 0);
      params = params.set('endblock', 99999999);
      params = params.set('sort', sortDirection);
      params = params.set('page', page);
      params = params.set('offset', offset);

      return this._http.get<AucEtherscanTransactionResponse>(`${apiUrl}`, { params })
        .pipe(
          map((data: AucEtherscanTransactionResponse) => {
            if (data.result && Array.isArray(data.result)) {
              data.result.forEach((tx: AucEtherscanTransaction) => {
                tx.explorerUrl = `${AucBlockExplorerUrls[chainId]}/tx/${tx.hash}`;
              });
            }

            return data;
          })
        );
    } catch (e) {
      console.error(e);

      return of(null);
    }
  }

  /** @internal */
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

  /** @internal */
  private _getLocalStorageKey(): string {
    if (!(window as any).ethereum) {
      return '';
    }

    const { chainId, selectedAddress } = (window as any).ethereum as AucEthereum;

    return `${AUC_ETHERSCAN_TRANSACTIONS}[${selectedAddress}, ${chainId}]`.toUpperCase();
  }

  /** @internal */
  private _refreshTransactions(): void {
    localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(this._transactions));

    this._transactionsChanged$.next(this._transactions.slice());
  }

  /** @internal */
  private _removeFromTransactions(hash: string): void {
    this._transactions = this._transactions.filter((tx) => tx.hash !== hash);
  }
}
