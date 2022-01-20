import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  AccountOption,
  NetworkOption,
  TableColumn,
  TransactionService,
  TransactionStatus,
  TransferModalService,
  WalletService,
  WrongNetworkModalComponent,
  WrongNetworkModalData
} from 'ngx-web3-components';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('actionRef', { static: true })
  public actionRef: TemplateRef<any>;

  @ViewChild('tokenRef', { static: true })
  public tokenRef: TemplateRef<any>;

  @ViewChild('timeRef', { static: true })
  public timeRef: TemplateRef<any>;

  public tableColumns: TableColumn[];

  public tableData: any[] = [];

  public networkOptions: NetworkOption[] = [
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Ethereum',
      chainId: '0x1',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Kovan',
      chainId: '0x2a',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/bsc.svg',
      name: 'BSC',
      chainId: '0x38',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/polygon.svg',
      name: 'Polygon',
      chainId: '0x89',
      isActive: false,
    },
    {
      icon: 'assets/svg/network/avax.svg',
      name: 'Avalanche',
      chainId: '0xa86a',
      isActive: false,
    },
  ];

  public accountOptions: AccountOption[] = [
    { label: 'My Account', id: 1 },
    { label: 'Some menu Item', id: 2 },
    { label: 'Some menu Item', id: 3 },
  ];

  constructor(
    private _matDialog: MatDialog,
    private _walletService: WalletService,
    private _transactionService: TransactionService,
    private _transferModalService: TransferModalService
  ) {
  }

  public onLoadMoreClick(): void {
    const tokens = [
      { icon: 'assets/svg/network/eth.svg', value: '1.240123' },
      { icon: 'assets/svg/coin/usdt.svg', value: '5.2k' },
    ];

    this.tableData = [
      ...this.tableData,
      { action: 'Withdraw', tokens, value: '$10.4k', time: 'about 6 hours ago' },
      { action: 'Withdraw', tokens, value: '$4.2k', time: '1 day ago' },
      { action: 'Invest', tokens, value: '$500', time: '2 days ago' },
      { action: 'Invest', tokens, value: '$10.4k', time: '14 days ago' },
      { action: 'Invest', tokens, value: '$10.4k', time: '20 days ago' },
    ];
  }

  public clearTransactions(): void {
    this._transactionService.clearTransactions();
  }

  public saveTransaction(status: TransactionStatus & any): void {
    this._transactionService.saveTransaction(
      `Name - ${status}`, '0x3f834a8a52b42242e40ea2c3cd470a31d07be63805db854721e765ed77e96d68', status);
  }

  public ngOnInit(): void {
    this.onLoadMoreClick();

    this.tableColumns = [
      { columnDef: 'action', headerCellDef: 'Action', templateRef: this.actionRef },
      { columnDef: 'tokens', headerCellDef: 'Tokens', templateRef: this.tokenRef },
      { columnDef: 'value', headerCellDef: 'Value' },
      { columnDef: 'time', headerCellDef: 'Time', templateRef: this.timeRef },
    ];

    this._walletService.accountsChanged$
      .subscribe((data) => {
        console.log('metamaskAccountsChanged$: ', data);

        console.log(this._walletService.web3);

        if (data?.length > 0) {
          this._transactionService.init();
        } else {
          this._transactionService.dispose();
        }
      });

    this._walletService.chainChanged$
      .subscribe((data) => console.log('metamaskChainChanged$: ', data));

    this._walletService.connectChanged$
      .subscribe((data) => console.log('metamaskConnect$: ', data));

    this._walletService.disconnectChanged$
      .subscribe((data) => console.log('metamaskDisconnect$: ', data));

    this._walletService.messageChanged$
      .subscribe((data) => console.log('metamaskMessage$: ', data));
  }

  public onConnectWalletChange(isConnected: boolean): void {
    console.log('isConnected: ', isConnected);
  }

  public onAccountOptionChange(accountOption: AccountOption): void {
    console.log(accountOption);
  }

  public onNetworkChange(option: NetworkOption): void {
    this.networkOptions = this.networkOptions.map(network => {
      return { ...network, isActive: option.name === network.name };
    });
  }

  public onWrongNetworkModalDataClick(): void {
    const config = new MatDialogConfig<WrongNetworkModalData>();

    config.data = {
      header: 'Wrong network',
      message: 'Looks like you connected to unsupported network. Please switch to Polygon.',
      switchLabel: 'Switch to Polygon',
      appearance: 'disconnect',
      chainId: '',
    };

    config.panelClass = 'custom-mat-dialog';

    this._matDialog.open(WrongNetworkModalComponent, config)
  }

  public showTransferModal(): void {
    this._transferModalService.openTransferModal()
      .pipe(
        filter(result => result),
        take(1)
      )
      .subscribe(result => console.log('Transfer Modal closed result: ', result));
  }
}
