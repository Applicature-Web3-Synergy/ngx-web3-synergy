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

import { AUC_SORT_DIRECTION } from '../../../enums';
import { AucBlockExplorerApiUrl, AucBlockExplorerUrls } from '../../../constants';
import { AucSortDirection } from '../../../types';
import { AucWalletConnectService } from '../../../connect/services';
import {
  AucAddTransaction,
  AucEtherscanTransaction,
  AucTransactionItem,
  AucEtherscanTransactionResponse
} from '../../interfaces';
import { AUC_TRANSACTION_STATUS } from '../../enums';
import { BaseSubscriber } from '../../../helpers';


const AUC_ETHERSCAN_TRANSACTIONS = 'AUC_ETHERSCAN_TRANSACTIONS';


@Injectable()
export class AucTransactionService extends BaseSubscriber {
  private _transactionsChanged$: BehaviorSubject<AucTransactionItem[]> =
    new BehaviorSubject<AucTransactionItem[]>([]);
  private _transactionsMap: Map<string, AucTransactionItem> = new Map();
  private chainId: string;
  private address: string;

  /**
   * Emits when transactions changed. <br>
   * @returns transactions list as Observable.
   */
  public get transactionsChanged$(): Observable<AucTransactionItem[]> {
    return this._transactionsChanged$
      .asObservable()
      .pipe(debounceTime(300));
  }

  /** @internal */
  private get _transactionsMapAsArr(): AucTransactionItem[] {
    return [ ...(this._transactionsMap.values() || []) ];
  }

  constructor(
    private _http: HttpClient,
    private _walletConnectService: AucWalletConnectService
  ) {
    super();

    this.initialize();
  }

  /** @internal */
  private initialize(): void {
    combineLatest([
      this._walletConnectService.chainChanged$,
      this._walletConnectService.accountsChanged$
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
  public refreshTransactions(intervalMs: number = 30000): void {
    this._refreshTransactionList$()
      .pipe(
        map(() => [ this._transactionsMapAsArr[0], this._transactionsMapAsArr[1] ]),
        switchMap((transactions: AucTransactionItem[]) => !transactions?.length
          ? of(transactions)
          : interval(intervalMs)
            .pipe(
              switchMap(() => this._refreshTransactionList$(transactions)),
              map(() => transactions.slice(0, 1))
            )
        ),
        filter((list: AucTransactionItem[]) => !!list?.length),
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
  public pingTransactionStatus(transaction: AucTransactionItem): Observable<AucTransactionItem | null> {
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
            status: transactionReceipt.status ? AUC_TRANSACTION_STATUS.SUCCESS : AUC_TRANSACTION_STATUS.FAIL
          }),
        switchMap((tx: AucTransactionItem) => {
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
  public saveTransaction(transactionData: AucAddTransaction,
                         updateIntervalMs: number = 30000): Observable<AucTransactionItem> {
    if (!transactionData?.hash) {
      return EMPTY;
    }

    const transaction: AucTransactionItem = {
      ...transactionData,
      explorerUrl: transactionData?.explorerUrl
        ? transactionData?.explorerUrl
        : AucBlockExplorerUrls[transactionData.chainId] && transactionData.hash
          ? `${AucBlockExplorerUrls[transactionData.chainId]}/tx/${transactionData.hash}`
          : null
    };

    const transaction$: BehaviorSubject<AucTransactionItem> =
      new BehaviorSubject<AucTransactionItem>(transaction);

    if (transaction.status === AUC_TRANSACTION_STATUS.PENDING) {
      interval(updateIntervalMs).pipe(
        switchMap(() => this.pingTransactionStatus(transaction)),
        filter((tx: AucTransactionItem) => tx?.status !== AUC_TRANSACTION_STATUS.PENDING),
        take(1)
      ).subscribe((tx: AucTransactionItem) => {
        transaction$.next(tx);
      });
    }

    return transaction$
      .asObservable()
      .pipe(
        tap((res: AucTransactionItem) => {
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
  public markAsViewed(hash: string, isRefresh: boolean = true): void {
    if (!hash) {
      return;
    }

    const transaction: AucTransactionItem = this._transactionsMap.get(hash);

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
    this._transactionsMap.forEach((transaction: AucTransactionItem) => {
      this.markAsViewed(transaction.hash, false);
    });

    this._refreshTransactions();
  }

  /**
   * Clear transactions list
   * @param isRefresh - Optional parameter.
   * If true, will clear transaction from the history.
   */
  public clearTransactions(isRefresh: boolean = true): void {
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
  private _getTransactionsAndSetToMap(): void {
    const transactions: AucTransactionItem[] =
      JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || [];

    this.clearTransactions(false);
    this._emitTransactionChanges();

    transactions.forEach((transaction: AucTransactionItem) => this._setTransactionToMap(transaction));
  }

  /** @internal */
  private _setTransactionToMap(transaction: AucTransactionItem): void {
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
    localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(this._transactionsMapAsArr));

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

    return `${AUC_ETHERSCAN_TRANSACTIONS}[${this.address}, ${this.chainId}]`.toUpperCase();
  }

  /**
   * @internal
   * Refresh transactions status.
   * @param transactionsList - transactions to refresh.
   * Optional parameter.
   * By the default all transactions.
   * @returns array of pending transactions.
   */
  private _refreshTransactionList$(transactionsList: AucTransactionItem[] = this._transactionsMapAsArr): Observable<AucTransactionItem[]> {
    return combineLatest(
      transactionsList.map((transaction: AucTransactionItem) =>
        (transaction?.status === AUC_TRANSACTION_STATUS.PENDING
            ? this.pingTransactionStatus(transaction)
            : of(transaction)
        )
          .pipe(
            tap((tx: AucTransactionItem) => {
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
        map((transactionsList: AucTransactionItem[]) =>
          (transactionsList ?? [])
            .filter((tx: AucTransactionItem) => tx?.status === AUC_TRANSACTION_STATUS.PENDING)
        )
      );
  }

}
