import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AccountOption,
  DIALOG_POSITIONS,
  DialogService,
  generateJazzicon,
  NetworkOption,
  TransferModalComponent,
  TransferModalData,
  WalletConnectService,
  WrongNetworkModalComponent,
  WrongNetworkModalData,
  WRONG_NETWORK_APPEARANCE
} from '@applicature/components';
import { DialogTestComponent } from './components/dialog-test/dialog-test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public identicon!: HTMLDivElement;
  public networkOptions: NetworkOption[] = [
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Ethereum',
      chainId: '0x1',
      isActive: false
    },
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Kovan',
      chainId: '0x2a',
      isActive: false
    },
    {
      icon: 'assets/svg/network/bsc.svg',
      name: 'BSC',
      chainId: '0x38',
      isActive: false
    },
    {
      icon: 'assets/svg/network/polygon.svg',
      name: 'Polygon',
      chainId: '0x89',
      isActive: false
    },
    {
      icon: 'assets/svg/network/avax.svg',
      name: 'Avalanche',
      chainId: '0xa86a',
      isActive: false
    }
  ];
  public accountOptions: AccountOption[] = [
    { name: 'My Account', id: 1 },
    { name: 'Some menu Item', id: 2 },
    { name: 'Some menu Item', id: 3 }
  ];

  constructor(
    private _matDialog: MatDialog,
    private _walletConnectService: WalletConnectService,
    private _dialogService: DialogService
  ) {

  }

  public ngOnInit(): void {
    this.identicon = generateJazzicon('0x6FF69D870c84a9D7F6c12095313F18F883A77f1D');

    this._walletConnectService.accountsChanged$
      .subscribe((data) => {
        console.log('metamaskAccountsChanged$: ', data);
      });

    this._walletConnectService.chainChanged$
      .subscribe((data) => {
        console.log('metamaskChainChanged$: ', data);
      });

    this._walletConnectService.connectChanged$
      .subscribe((data) => {
        console.log('metamaskConnect$: ', data);
      });

    this._walletConnectService.disconnectChanged$
      .subscribe((data) => {
        console.log('metamaskDisconnect$: ', data);
      });

    this._walletConnectService.messageChanged$
      .subscribe((data) => {
        console.log('metamaskMessage$: ', data);
      });
  }

  public onOpenTestCustomModal(): void {
    const ref = this._dialogService.open<DialogTestComponent, { message: string }>(DialogTestComponent, {
      data: { message: 'I am a dynamic component!' },
      width: '400px',
      height: '500px',
      minWidth: '320px',
      minHeight: '320px',
      maxWidth: '600px',
      maxHeight: '700px',
      position: DIALOG_POSITIONS.TOP_RIGHT,
      dialogClass: 'dialog-class-test',
      panel: {
        panelClass: 'panel-class-test'
      },
      overlay: {
        hasOverlay: false,
        closeByClick: true,
        overlayClass: ['test-overlay-class1', 'test-overlay-class2']
      }
    });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  public onOpenTransferModalClick(): void {
    const data: TransferModalData = {
      header: 'Transfer',
      symbol: 'USDT',
      allowance: '1000000000000000000',
      max: '10000000000000000000',
      approveButton: 'Approve',
      approvingButton: 'Approving...',
      confirmButton: 'Transfer',
      approve: () => {
        return Promise.resolve();
      },
      confirm: () => {
        return Promise.resolve();
      }
    };

    const ref = this._dialogService.open<TransferModalComponent, TransferModalData>(TransferModalComponent, {
      data,
      dialogClass: 'applicature-dialog',
    });

    ref.afterClosed.subscribe(result => {
      console.log('Transfer Dialog closed: ', result);
    });
  }

  public onOpenWrongNetworkModalClick(): void {
    const data: WrongNetworkModalData = {
      header: 'WRONG NETWORK',
      message: 'Looks like you connected to unsupported network. Change network to Mainnet.',
      chainId: '156',
      switchLabel: 'Swith label',
      appearance: WRONG_NETWORK_APPEARANCE.SWITCH
    };

    const ref = this._dialogService.open<WrongNetworkModalComponent, WrongNetworkModalData>(WrongNetworkModalComponent, {
      data,
      width: '100%',
      maxWidth: "420px",
      dialogClass: 'applicature-dialog',
    });

    ref.afterClosed.subscribe(result => {
      console.log('Transfer Dialog closed: ', result);
    });
  }
}
