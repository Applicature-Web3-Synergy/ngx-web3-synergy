import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  from,
  interval,
  Observable,
  of,
  Subscriber,
  take
} from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Transaction, TransactionReceipt } from 'web3-core';

import { W3S_SORT_DIRECTION } from '../../../enums';
import { W3sBlockExplorerApiUrl, W3sBlockExplorerUrls } from '../../../constants';
import { W3sSortDirection } from '../../../types';
import { W3sWalletConnectService } from '../../../connect';
import {
  W3sAddTransaction,
  W3sEtherscanTransaction,
  W3sTransactionItem,
  W3sEtherscanTransactionResponse
} from '../../interfaces';
import { W3S_TRANSACTION_STATUS } from '../../enums';
import { BaseSubscriber } from '../../../helpers';
import { W3sLocalStorageService } from '../../../services';


const W3S_ETHERSCAN_TRANSACTIONS = 'W3S_ETHERSCAN_TRANSACTIONS';


@Injectable({
  providedIn: 'root'
})
export class W3sTransactionService extends BaseSubscriber {
  private _transactionsChanged$: BehaviorSubject<W3sTransactionItem[]> =
    new BehaviorSubject<W3sTransactionItem[]>([]);
  private _transactionsMap: Map<string, W3sTransactionItem> = new Map();
  private chainId: string;
  private address: string;

  /**
   * Emits when transactions changed. <br>
   * @returns transactions list as Observable.
   */
  public get transactionsChanged$(): Observable<W3sTransactionItem[]> {
    return this._transactionsChanged$
      .asObservable()
      .pipe(debounceTime(300));
  }

  /** @internal */
  private get _transactionsMapAsArr(): W3sTransactionItem[] {
    return [ ...(this._transactionsMap.values() || []) ];
  }

  constructor(
    private _http: HttpClient,
    private _walletConnectService: W3sWalletConnectService,
    private _localStorageService: W3sLocalStorageService
  ) {
    super();

    this.initialize();
  }

  /** @internal */
  private initialize(): void {
    combineLatest([
      this._walletConnectService.chain$,
      this._walletConnectService.accounts$
        .pipe(map((accounts: string[]) => (accounts ?? [])[0] || null))
    ])
      .pipe(
        debounceTime(300),
        filter(([chainId, address]: string[]) => chainId !== this.chainId || address !== this.address),
        takeUntil(this.notifier),
      )
      .subscribe(([chainId, address]: string[]) => {
        this.chainId = chainId;
        this.address = address;

        if (!chainId || !address) {
          if (this._transactionsMap.size) {
            this.clearTransactions(false);
            this._emitTransactionChanges();
          }

          return;
        }

        this._getTransactionsAndSetToMap();
        this._emitTransactionChanges();

        this.refreshTransactions();
      });
  }

  /**
   * Refresh transactions status.
   * Emits until transactions list includes transactions with pending status.
   * @param intervalMs - used for status update in milliseconds.
   * Optional parameter.
   * Default value is 30000 = 30 seconds.
   */
  public refreshTransactions(intervalMs = 30000): void {
    this._refreshTransactionList$()
      .pipe(
        map(() => [ this._transactionsMapAsArr[0], this._transactionsMapAsArr[1] ]),
        switchMap((transactions: W3sTransactionItem[]) => !transactions?.length
          ? of(transactions)
          : interval(intervalMs)
            .pipe(
              switchMap(() => this._refreshTransactionList$(transactions)),
              map(() => transactions.slice(0, 1))
            )
        ),
        filter((list: W3sTransactionItem[]) => !!list?.length),
        take(1),
        tap(() => this._refreshTransactions())
      )
      .subscribe();
  }

  /**
   * Check transaction status on blockchain.
   * @param transaction - transaction to check.
   * @returns transaction with changed status.
   */
  public pingTransactionStatus(transaction: W3sTransactionItem): Observable<W3sTransactionItem | null> {
    const eth = this._walletConnectService.web3?.eth;

    if (!eth || !transaction?.hash) {
      return of(null);
    }

    return new Observable((observer: Subscriber<TransactionReceipt>) => {
      try {
        eth.getTransactionReceipt(transaction.hash)
          .then((transactionReceipt: TransactionReceipt) => {
            observer.next(transactionReceipt);
            observer.complete();
          })
          .catch(error => observer.error(error));
      } catch (e) {
        observer.error(e);
      }
    })
      .pipe(
        map((transactionReceipt: TransactionReceipt) => !transactionReceipt
          ? null
          : {
            ...transaction,
            status: transactionReceipt.status ? W3S_TRANSACTION_STATUS.SUCCESS : W3S_TRANSACTION_STATUS.FAIL
          }),
        switchMap((tx: W3sTransactionItem) => {
          if (tx) {
            return of(tx);
          }

          return from(eth.getTransaction(transaction.hash))
            .pipe(
              tap((tr: Transaction) => {
                if (!tr) {
                  this._removeFromTransactions(transaction.hash);
                }
              }),
              map((tr: Transaction) => tr ? transaction : null),
            );
        }),
        catchError(() => {
          this._removeFromTransactions(transaction.hash);
          return of(null);
        })
      );
  }

  /**
   * Supported networks {@link W3sBlockExplorerApiUrl}`. <br>
   * @returns API url by chainId.
   */
  static getTransactionApiUrl(chainId: string): string {
    const url: string = W3sBlockExplorerApiUrl[chainId];

    if (!url) {
      throw new Error(`Can't find transaction API url. Make sure that you add blockExplorerApiUrl when init library`);
    }

    return url;
  }

  /**
   * Add transaction to the list.
   * @param transactionData - transaction data.
   * @param updateIntervalMs - used for status update in milliseconds.
   * Optional parameter.
   * Default value is 30000 = 30 seconds.
   * @returns transaction as Observable value.<br>
   * If transaction status is pending, used parameter {@link updateIntervalMs} for getting transaction status from
   * blockchain and emits it into returned observable.
   */
  public saveTransaction(transactionData: W3sAddTransaction,
                         updateIntervalMs = 30000): Observable<W3sTransactionItem> {
    if (!transactionData?.hash) {
      return EMPTY;
    }

    const transaction: W3sTransactionItem = {
      ...transactionData,
      explorerUrl: transactionData?.explorerUrl
        ? transactionData?.explorerUrl
        : W3sBlockExplorerUrls[transactionData.chainId] && transactionData.hash
          ? `${W3sBlockExplorerUrls[transactionData.chainId]}/tx/${transactionData.hash}`
          : null
    };

    const transaction$: BehaviorSubject<W3sTransactionItem> =
      new BehaviorSubject<W3sTransactionItem>(transaction);

    if (transaction.status === W3S_TRANSACTION_STATUS.PENDING) {
      interval(updateIntervalMs).pipe(
        switchMap(() => this.pingTransactionStatus(transaction)),
        filter((tx: W3sTransactionItem) => tx?.status !== W3S_TRANSACTION_STATUS.PENDING),
        take(1)
      ).subscribe((tx: W3sTransactionItem) => {
        transaction$.next(tx);
      });
    }

    return transaction$
      .asObservable()
      .pipe(
        tap((res: W3sTransactionItem) => {
          this._setTransactionToMap(res);
          this._refreshTransactions();
        }),
        debounceTime(300)
      );
  }

  /**
   * Marks transaction as viewed.
   * @param hash - Transaction hash.
   * @param isRefresh - Optional parameter.
   * If true, will emit transactionsChanged$;
   */
  public markAsViewed(hash: string, isRefresh = true): void {
    if (!hash) {
      return;
    }

    const transaction: W3sTransactionItem = this._transactionsMap.get(hash);

    if (!transaction || transaction.viewed) {
      return;
    }

    this._transactionsMap.set(hash, {
      ...transaction,
      viewed: true
    });

    if (isRefresh) {
      this._refreshTransactions();
    }
  }

  /** Marks all transactions as viewed */
  public markAllAsViewed(): void {
    this._transactionsMap.forEach((transaction: W3sTransactionItem) => {
      this.markAsViewed(transaction.hash, false);
    });

    this._refreshTransactions();
  }

  /**
   * Clear transactions list
   * @param isRefresh - Optional parameter.
   * If true, will clear transaction from the history.
   */
  public clearTransactions(isRefresh = true): void {
    this._transactionsMap.clear();

    if (isRefresh) {
      this._refreshTransactions();
    }
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
                               page = 1,
                               offset = 100,
                               sortDirection: W3sSortDirection = W3S_SORT_DIRECTION.ASC
  ): Observable<W3sEtherscanTransactionResponse> {
    try {
      const apiUrl: string = W3sTransactionService.getTransactionApiUrl(chainId);

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

      return this._http.get<W3sEtherscanTransactionResponse>(`${apiUrl}`, { params })
        .pipe(
          map((data: W3sEtherscanTransactionResponse) => {
            if (data.result && Array.isArray(data.result)) {
              data.result.forEach((tx: W3sEtherscanTransaction) => {
                tx.explorerUrl = `${W3sBlockExplorerUrls[chainId]}/tx/${tx.hash}`;
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
  private _getTransactionsAndSetToMap(): void {
    const transactions: W3sTransactionItem[] =
      JSON.parse(this._localStorageService.getItem(this._getLocalStorageKey())) || [];

    this.clearTransactions(false);
    this._emitTransactionChanges();

    transactions.forEach((transaction: W3sTransactionItem) => this._setTransactionToMap(transaction));
  }

  /** @internal */
  private _setTransactionToMap(transaction: W3sTransactionItem): void {
    if (!transaction?.hash) {
      return;
    }

    this._transactionsMap.set(transaction.hash, transaction);
  }

  /** @internal */
  private _removeFromTransactions(hash: string): void {
    if (this._transactionsMap.has(hash)) {
      this._transactionsMap.delete(hash);
    }
  }

  /** @internal */
  private _refreshTransactions(): void {
    this._localStorageService.setItem(this._getLocalStorageKey(), JSON.stringify(this._transactionsMapAsArr));

    this._emitTransactionChanges();
  }

  /** @internal */
  private _emitTransactionChanges(): void {
    this._transactionsChanged$.next(this._transactionsMapAsArr.reverse());
  }

  /** @internal */
  private _getLocalStorageKey(): string {
    if (!this.address || !this.chainId) {
      return '';
    }

    return `${W3S_ETHERSCAN_TRANSACTIONS}[${this.address}, ${this.chainId}]`.toUpperCase();
  }

  /**
   * @internal
   * Refresh transactions status.
   * @param transactionsList - transactions to refresh.
   * Optional parameter.
   * By the default all transactions.
   * @returns array of pending transactions.
   */
  private _refreshTransactionList$(transactionsList: W3sTransactionItem[] = this._transactionsMapAsArr): Observable<W3sTransactionItem[]> {
    return combineLatest(
      transactionsList.map((transaction: W3sTransactionItem) =>
        (transaction?.status === W3S_TRANSACTION_STATUS.PENDING
            ? this.pingTransactionStatus(transaction)
            : of(transaction)
        )
          .pipe(
            tap((tx: W3sTransactionItem) => {
              if (!tx) {
                this._removeFromTransactions(transaction?.hash)
                return;
              }

              if (transaction.status !== tx.status) {
                this._setTransactionToMap(tx);
              }
            })
          )
      )
    )
      .pipe(
        tap(() => this._refreshTransactions()),
        map((transactionsList: W3sTransactionItem[]) =>
          (transactionsList ?? [])
            .filter((tx: W3sTransactionItem) => tx?.status === W3S_TRANSACTION_STATUS.PENDING)
        )
      );
  }

}
