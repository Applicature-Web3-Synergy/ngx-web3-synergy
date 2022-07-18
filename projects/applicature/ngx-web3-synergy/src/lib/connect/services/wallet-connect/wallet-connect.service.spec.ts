/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const */

import { TestBed, waitForAsync } from '@angular/core/testing';
import { catchError, firstValueFrom, Observable, of, Subject, take } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import injectedModule from '@web3-onboard/injected-wallets';
import { AppState, WalletState } from '@web3-onboard/core/dist/types';
import Web3 from 'web3';

import { W3S_CONNECTED_WALLET_NAME, W3sWalletConnectService } from './wallet-connect.service';
import { TestW3sConnectModuleMetadata } from '../../connect.module.spec';
import { W3sConnectionState, W3sInitOptions } from './interfaces';
import { W3S_CHAIN_ID } from '../../../enums';
import { W3sBlockExplorerUrls, W3sNativeCurrencies, W3sRpcUrls } from '../../../constants';
import { W3sBlockScrollHelperService } from '../../../helpers';
import { W3sDialogConfig, W3sDialogRef, W3sDialogService } from '../../../dialog';
import { W3sConnectDialogConfig, W3sConnectDialogData, W3sConnectModalComponent } from '../../components';
import { W3sWalletLabel } from './types';

const InitializationConfigMock: W3sInitOptions = {
  wallets: [
    /** Will show all installed injected wallets */
    {
      label: 'injected',
      module: injectedModule()
    }
  ],
  chains: [
    {
      id: W3S_CHAIN_ID.BSC_TESTNET,
      token: 'BNB',
      label: 'BNB Chain',
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      icon: 'assets/svg/network/bsc.svg',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
      namespace: 'evm',
      color: '#000',
      providerConnectionInfo: {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545'
      }
    },
    {
      id: W3S_CHAIN_ID.POLYGON_TESTNET,
      token: W3sNativeCurrencies[W3S_CHAIN_ID.POLYGON_TESTNET].name,
      label: 'Matic',
      rpcUrl: W3sRpcUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
      icon: 'assets/svg/network/polygon.svg',
      blockExplorerUrl: W3sBlockExplorerUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
    }
  ]
};

const stateMock: AppState = { wallets: [ { label: 'Metamask' } ] } as AppState;

const web3Provider = new Web3.providers.WebsocketProvider('ws://remotenode.com:8546');

const WalletStateMock: WalletState = {
  label: 'Metamask',
  provider: (web3Provider as any),
  icon: 'icon url',
  accounts: [],
  chains: []
};

describe('W3sWalletConnectService.', () => {
  let service: W3sWalletConnectService;
  let initializeRes: Observable<void>;

  beforeEach(() => {
    TestBed.configureTestingModule(TestW3sConnectModuleMetadata);
    service = TestBed.inject(W3sWalletConnectService);
  });

  beforeEach(async () => {
    initializeRes = service.initialize(InitializationConfigMock);
    await firstValueFrom(initializeRes);
  });

  it('should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize app.', waitForAsync(() => {
    let actualResult = null;
    const expectedResult = undefined;

    initializeRes
      .pipe(take(1))
      .subscribe(res => actualResult = res);

    expect(actualResult).toEqual(expectedResult);
  }));

  describe('Initialize app Err.', () => {
    let consoleErrorsSpy: jasmine.Spy<any>;

    beforeEach(() => {
      consoleErrorsSpy = spyOn<any>(console, 'error');
    });

    it('should return null if app already initialized.', waitForAsync(() => {
      let actualResult;
      const expectedResult = null;
      const result = initializeRes
        .pipe(switchMap(() => service.initialize(InitializationConfigMock)));

      result
        .pipe(take(1))
        .subscribe(res => actualResult = res);

      expect(consoleErrorsSpy).toHaveBeenCalledWith('web3-onboard already initialized');
      expect(actualResult).toEqual(expectedResult);
    }));

    it('should return null when initialize app without config', waitForAsync(() => {
      let actualResult;
      const expectedResult = null;
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.initialize(null)
        .pipe(take(1))
        .subscribe(res => actualResult = res);

      expect(consoleErrorsSpy).toHaveBeenCalledWith('Please set config!');
      expect(actualResult).toEqual(expectedResult);
    }));

    it('should return null if no config wallets.', waitForAsync(() => {
      let actualResult;
      const expectedResult = null;
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.initialize({
        ...InitializationConfigMock,
        wallets: null
      })
        .pipe(take(1))
        .subscribe(res => actualResult = res);

      expect(consoleErrorsSpy)
        .toHaveBeenCalledWith('Minimum 1 wallets should be set. Please set wallets to config!');
      expect(actualResult).toEqual(expectedResult);
    }));

    it('should return null if config wallets is empty array.', waitForAsync(() => {
      const expectedResult = null;
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.initialize({
        ...InitializationConfigMock,
        wallets: []
      })
        .pipe(take(1))
        .subscribe(res => {
          expect(consoleErrorsSpy)
            .toHaveBeenCalledWith('Minimum 1 wallets should be set. Please set wallets to config!');
          expect(res).toEqual(expectedResult);
        });
    }));

    it('should return error if something went wrong.', waitForAsync(() => {
      let actualResult = null;
      const expectedResult = '"wallets[0]" must be of type function';
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.initialize({
        ...InitializationConfigMock,
        wallets: [ {
          label: 'MetaMask',
          module: null
        } ]
      })
        .pipe(
          catchError(err => {
            actualResult = err?.error?.details[0]?.message;

            return of(null);
          }),
          take(1)
        )
        .subscribe();

      expect(actualResult).toEqual(expectedResult);
    }));
  });

  describe('After App initialized.', () => {
    let connectWalletSpy: jasmine.Spy<any>;
    let lsGetSpy: jasmine.Spy<any>;

    beforeEach(() => {
      lsGetSpy = spyOn(localStorage, 'getItem');
      connectWalletSpy = spyOn(service?.onboard, 'connectWallet')
        .and.returnValue(Promise.resolve(null));

      service['_onboard'] = null;
    });

    it('should autoSelect wallet after app initialization.', () => {
      const walletLabel = 'MetaMask';
      const expectedResult = {
        autoSelect: {
          label: walletLabel,
          disableModals: true
        }
      };
      lsGetSpy.and.returnValue(walletLabel);

      service.initialize(InitializationConfigMock)
        .pipe(take(1))
        .subscribe(() => {
          expect(connectWalletSpy).toHaveBeenCalledWith(expectedResult);
        });
    });

    it(`shouldn't autoSelect wallet after app initialization.`, () => {
      lsGetSpy.and.returnValue(null);

      service.initialize(InitializationConfigMock)
        .pipe(take(1))
        .subscribe(() => {
          expect(connectWalletSpy).not.toHaveBeenCalled();
        });
    });
  });

  describe('After wallet connects.', () => {
    const wallet: WalletState = { ...WalletStateMock };
    let walletsState$: Subject<WalletState[]>;
    let stateChanged$: Subject<void>;
    let initWeb3Spy: jasmine.Spy<any>;

    beforeEach(() => {
      stateChanged$ = new Subject<void>();
      walletsState$ = new Subject<WalletState[]>();

      walletsState$
        .pipe(
          debounceTime(1000),
          take(1)
        )
        .subscribe(() => {
          stateChanged$.next();
        });

      spyOn(service.onboard.state, 'select').and.returnValue(walletsState$.asObservable());
      initWeb3Spy = spyOn(service, 'initWeb3');
      service['_subscriptions']();
    });

    afterEach(() => {
      walletsState$.complete();
      stateChanged$.complete();
      walletsState$ = null;
      stateChanged$ = null;
    });

    it('should remove connected wallet label from localStorage.', () => {
      const lsSetItemSpy = spyOn(localStorage, 'setItem').and.returnValue(null);
      const lsRemoveItemSpy = spyOn(localStorage, 'removeItem').and.returnValue(null);

      walletsState$.next([]);

      stateChanged$
        .pipe(
          take(1)
        )
        .subscribe(() => {
          expect(initWeb3Spy).toHaveBeenCalledWith(undefined);
          expect(lsSetItemSpy).not.toHaveBeenCalled();
          expect(lsRemoveItemSpy).toHaveBeenCalledWith(W3S_CONNECTED_WALLET_NAME);
        });
    });

    it('should set connected wallet label to localStorage.', () => {
      const lsSetItemSpy = spyOn(localStorage, 'setItem').and.returnValue(null);

      walletsState$.next([ wallet ]);

      stateChanged$
        .pipe(take(1))
        .subscribe(() => {
          expect(initWeb3Spy).toHaveBeenCalledWith(wallet.provider);
          expect(lsSetItemSpy).toHaveBeenCalledWith(W3S_CONNECTED_WALLET_NAME, wallet.label);
        });
    });

    it('should emit accounts as [], balance as null and set chainId as null if no connected account.',
      () => {
        spyOn(localStorage, 'setItem').and.returnValue(null);
        spyOn(localStorage, 'removeItem').and.returnValue(null);
        const accountsSpy = spyOn(service['_accounts$'], 'next');
        const balanceSpy = spyOn(service['_balance$'], 'next');

        walletsState$.next([]);

        stateChanged$
          .pipe(
            take(1)
          )
          .subscribe(() => {
            expect(initWeb3Spy).toHaveBeenCalledWith(undefined);
            expect(accountsSpy).toHaveBeenCalledWith([]);
            expect(balanceSpy).toHaveBeenCalledWith(null);
            expect(service['_chain$'].value).toEqual(null);
          });
      });

    it('should emit accounts, balance and set chainId if connected wallet.', () => {
      spyOn(localStorage, 'setItem').and.returnValue(null);
      spyOn(localStorage, 'removeItem').and.returnValue(null);
      const accountsSpy = spyOn(service['_accounts$'], 'next');
      const balanceSpy = spyOn(service['_balance$'], 'next');
      const expectedWalletState: WalletState = {
        ...wallet,
        accounts: [{
          address: '091x...33',
          ens: null,
          balance: {
            MATIC: '123'
          }
        }],
        chains: [ {
          id: W3S_CHAIN_ID.POLYGON_TESTNET,
          namespace: 'evm'
        } ]
      }
      walletsState$.next([expectedWalletState]);

      stateChanged$
        .pipe(
          take(1)
        )
        .subscribe(() => {
          expect(initWeb3Spy).toHaveBeenCalledWith(wallet.provider);
          expect(accountsSpy).toHaveBeenCalledWith([expectedWalletState.accounts[0].address]);
          expect(balanceSpy).toHaveBeenCalledWith(expectedWalletState.accounts[0].balance);
          expect(service['_chain$'].value).toEqual(expectedWalletState.chains[0]?.id);
        });
    });
  });

  describe('Connect.', () => {
    let dialogOpenSpy: jasmine.Spy<any>;
    const dialogRef: W3sDialogRef = new W3sDialogRef();
    let dialogService: W3sDialogService;

    beforeEach(() => {
      dialogService = TestBed.inject(W3sDialogService);
      dialogOpenSpy = spyOn(dialogService, 'open')
        .and.returnValue(dialogRef);
    });

    it('should return connected = false if app is not initialized.', waitForAsync(() => {
      let actualResult;
      const expectedResult = { connected: false };
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.connect()
        .pipe(
          tap(res => actualResult = res),
          take(1)
        )
        .subscribe();

      expect(actualResult).toEqual(expectedResult);
    }));

    it('should call lockScroll.', () => {
      const scrollService = TestBed.inject(W3sBlockScrollHelperService);
      const scrollServiceSpy = spyOn<any>(scrollService, 'lockScroll');

      service.connect()
        .pipe(
          take(1)
        )
        .subscribe();

      expect(scrollServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should call dialog open with default config.', () => {
      const expectedResult: W3sDialogConfig<W3sConnectDialogData> = {
        data: {
          title: 'Connect a wallet',
          service
        },
        width: '400px',
        dialogClass: 'w3s-connect-dialog',
        overlay: {
          hasOverlay: true,
          closeByClick: false,
          overlayClass: [ 'w3s-connect-dialog-overlay' ],
        }
      };

      service.connect()
        .pipe(
          take(1)
        )
        .subscribe();

      expect(dialogOpenSpy).toHaveBeenCalledWith(W3sConnectModalComponent, expectedResult);
    });

    it('should call dialog open with custom config.', () => {
      const customConfig: W3sDialogConfig<W3sConnectDialogConfig> = {
        data: {
          title: 'Custom title',
        },
        width: '700px',
        dialogClass: 'custom-connect-dialog',
        overlay: {
          hasOverlay: true,
          closeByClick: false,
          overlayClass: [ 'custom-connect-dialog-overlay' ],
        }
      };
      const expectedResult: W3sDialogConfig<W3sConnectDialogData> = {
        ...customConfig,
        data: {
          ...customConfig.data,
          service
        }
      };

      service.connect(customConfig)
        .pipe(
          take(1)
        )
        .subscribe();

      expect(dialogOpenSpy).toHaveBeenCalledWith(W3sConnectModalComponent, expectedResult);
    });

    it('should call connectWallet.', () => {
      let actualResult;
      const expectedLabel = 'Metamask';
      const expectedResult: W3sConnectionState = {
        connected: false,
        state: null
      };
      const connectWalletSpy: jasmine.Spy<any> = spyOn(service, 'connectWallet')
        .and.returnValue(of(expectedResult));

      service.connect()
        .pipe(
          take(1)
        )
        .subscribe((res) => {
          actualResult = res;
        });
      dialogRef.close(expectedLabel);

      expect(connectWalletSpy).toHaveBeenCalledWith(expectedLabel);
      expect(actualResult).toEqual(expectedResult);
    });

    it(`shouldn't call connectWallet.`, () => {
      let actualResult;
      const expectedResult: W3sConnectionState = {
        connected: false,
        state: null
      };
      const connectWalletSpy: jasmine.Spy<any> = spyOn(service, 'connectWallet')
        .and.returnValue(of(expectedResult));
      spyOnProperty(service, 'connectionState')
        .and.returnValue(expectedResult);

      service.connect()
        .pipe(
          take(1)
        )
        .subscribe((res) => {
          actualResult = res;
        });
      dialogRef.close();

      expect(connectWalletSpy).not.toHaveBeenCalled();
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('Disconnect Wallet.', () => {
    let removeFromLsSpy: jasmine.Spy<any>;

    beforeEach(() => {
      removeFromLsSpy = spyOn(localStorage, 'removeItem');
    });

    it('should disconnect primary wallet.', () => {
      const primaryWalletLabel = 'CoinBase';
      const expectedResult = { label: primaryWalletLabel };
      const disconnectSpy = spyOn(service.onboard, 'disconnectWallet').and.returnValue(null);
      spyOn(service.onboard.state, 'get')
        .and.returnValue({ wallets: [ { label: primaryWalletLabel } ] } as AppState);

      service.disconnectWallet()
        .pipe(take(1))
        .subscribe();

      expect(disconnectSpy).toHaveBeenCalledWith(expectedResult);
      expect(removeFromLsSpy).toHaveBeenCalledWith(W3S_CONNECTED_WALLET_NAME);
    });

    it('should disconnect if no primary wallet but has label argument.', () => {
      const label = 'MetaMask';
      const expectedResult = { label: label };
      const disconnectSpy = spyOn(service.onboard, 'disconnectWallet').and.returnValue(null);
      spyOn(service.onboard.state, 'get')
        .and.returnValue({ wallets: [] } as AppState);

      service.disconnectWallet(label)
        .pipe(take(1))
        .subscribe();

      expect(disconnectSpy).toHaveBeenCalledWith(expectedResult);
      expect(removeFromLsSpy).toHaveBeenCalledWith(W3S_CONNECTED_WALLET_NAME);
    });

    it(`shouldn't disconnect if no primary wallet and no label argument.`, () => {
      const disconnectSpy = spyOn(service.onboard, 'disconnectWallet').and.returnValue(null);
      spyOn(service.onboard.state, 'get')
        .and.returnValue({ wallets: [] } as AppState);

      service.disconnectWallet()
        .pipe(take(1))
        .subscribe();

      expect(disconnectSpy).not.toHaveBeenCalled();
      expect(removeFromLsSpy).toHaveBeenCalledWith(W3S_CONNECTED_WALLET_NAME);
    });
  });

  describe('Connect Wallet.', () => {
    it(`shouldn't connect wallet if app isn't initialized.`, () => {
      let actualResult;
      const expectedResult = { connected: false };
      spyOnProperty(service, 'onboard').and.returnValue(null);

      service.connectWallet('MetaMask')
        .pipe(take(1))
        .subscribe(res => actualResult = res);

      expect(actualResult).toEqual(expectedResult);
    });

    it(`shouldn't connect wallet if no label.`, () => {
      let actualResult;
      const expectedResult = service.connectionState;

      service.connectWallet(null)
        .pipe(take(1))
        .subscribe(res => actualResult = res);

      expect(actualResult).toEqual(expectedResult);
    });

    it(`shouldn't connect wallet if err.`, () => {
      let actualResult;
      const expectedResult = 'Error!!!';
      const connectSpy = spyOn(service.onboard, 'connectWallet')
        .and.returnValue(Promise.reject(expectedResult));

      service.connectWallet('Some wrong label' as W3sWalletLabel)
        .pipe(
          catchError(err => {
            actualResult = err;
            return of(null);
          }),
          take(1)
        )
        .subscribe(() => {
          expect(connectSpy).toHaveBeenCalled();
          expect(actualResult).toEqual(expectedResult);
        });
    });

    it('should connect wallet.', waitForAsync(() => {
      const label = 'MetaMask';
      const expectedResult = { autoSelect: { label, disableModals: true } };
      const expectedResult2 = {
        connected: true,
        state: null
      };
      const connectSpy = spyOn(service.onboard, 'connectWallet')
        .and.returnValue(Promise.resolve([ {
          label,
          icon: '',
          provider: null,
          accounts: [],
          chains: []
        } ]));
      spyOnProperty(service, 'connectionState').and.returnValue(expectedResult2);

      service.connectWallet(label)
        .pipe(take(1))
        .subscribe(res => {
          expect(connectSpy).toHaveBeenCalledWith(expectedResult);
          expect(res).toEqual(expectedResult2);
        });
    }));

    it('should connect wallet and disconnect previous connection.', waitForAsync(() => {
      const label = 'MetaMask';
      const labelToDisconnect = 'WalletConnect';

      const disconnectSpy = spyOn(service, 'disconnectWallet').and.returnValue(of(null));
      const connectSpy = spyOn(service.onboard, 'connectWallet')
        .and.returnValue(Promise.resolve([
          {
            label,
            icon: '',
            provider: null,
            accounts: [],
            chains: []
          },
          {
            label: labelToDisconnect,
            icon: '',
            provider: null,
            accounts: [],
            chains: []
          }
        ]));
      spyOnProperty(service, 'connectionState').and.returnValue({
        connected: true,
        state: null
      });

      service.connectWallet(label)
        .pipe(take(1))
        .subscribe(() => {
          expect(connectSpy).toHaveBeenCalled();
          expect(disconnectSpy).toHaveBeenCalledWith(labelToDisconnect);
        });
    }));
  });

  it('should init web3.', () => {
    const expectedResult = Web3.givenProvider;
    const actualResult = service.initWeb3();

    expect(actualResult instanceof Web3).toBeTruthy();
    expect(actualResult.currentProvider).toEqual(expectedResult);
  });

  it('should init web3 with custom provider.', () => {
    const expectedResult = web3Provider;
    const actualResult = service.initWeb3(expectedResult);

    expect(actualResult instanceof Web3).toBeTruthy();
    expect(actualResult.currentProvider).toEqual(expectedResult);
  });

  it('should return initialization config.', () => {
    expect(service.initializationConfig).toEqual(InitializationConfigMock);
  });

  it('should return initialized wallets Map.', () => {
    const expectedResult = new Map();
    expectedResult.set('test', 1);
    let actualRes;
    service['_initializedWalletsMap'] = expectedResult;

    actualRes = service.initializedWalletsMap;

    expect(actualRes).toEqual(expectedResult);
  });

  it('should return Web3 instance.', () => {
    expect(service.web3 instanceof Web3).toBeTruthy();
  });

  it('should return onboard instance.', () => {
    const actualRes = Object.keys(service.onboard).sort();
    const expectedResult = [ 'connectWallet', 'disconnectWallet', 'setChain', 'state' ].sort();

    expect(actualRes).toEqual(expectedResult);
  });

  it('should return blockExplorerUrlByChainId.', () => {
    const expectedResult = {
      '0x1': {
        blockExplorerUrl: 'test explorer url'
      }
    };
    let actualRes;
    service['_blockExplorerUrlByChainId'] = expectedResult;

    actualRes = service.blockExplorerUrlByChainId;

    expect(actualRes).toEqual(expectedResult);
  });

  it('should return connection state as false if app is not initialized.', () => {
    spyOnProperty(service, 'onboard').and.returnValue(null);
    const expectedResult = { connected: false };

    const actualRes = service.connectionState;

    expect(actualRes).toEqual(expectedResult);
  });

  it('should return connection state.', () => {
    // const stateMock: AppState = { wallets: [ { label: 'Metamask' } ] } as AppState;
    const expectedResult = {
      connected: true,
      state: stateMock
    };
    spyOn(service.onboard.state, 'get')
      .and.returnValue(stateMock);

    const actualRes = service.connectionState;

    expect(actualRes).toEqual(expectedResult);
  });

  it('should return accounts$.', () => {
    const expectedResult = [ 'test account address' ];
    service['_accounts$'].next(expectedResult);

    service.accounts$
      .pipe(take(1))
      .subscribe((res: string[]) => {
        expect(res).toEqual(expectedResult);
      });
  });

  it('should return chbalance$.', () => {
    const expectedResult = { ETH: '1' };
    service['_balance$'].next(expectedResult);

    service.balance$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(expectedResult);
      });
  });

  it('should return chain$.', () => {
    const expectedResult = '0x1';
    service['_chain$'].next(expectedResult);

    service.chain$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(expectedResult);
      });
  });

  it('should set chain$.', () => {
    const expectedResult = '0x1';

    service['chainId'] = expectedResult;

    service.chain$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(expectedResult);
      });
  });

  it('should return connectionState$ as false if app is not installed.', () => {
    const expectedResult = { connected: false };
    spyOnProperty(service, 'onboard').and.returnValue(null);

    service.connectionState$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(expectedResult);
      });
  });

  it('should return connectionState$ if no connected wallets', () => {
    const state: AppState = { wallets: [] } as AppState;
    const expectedResult = { connected: false, state };
    const removeFromLsSpy = spyOn(localStorage, 'removeItem');
    spyOn(service.onboard.state, 'select')
      .and.returnValue(of(state as any));

    service.connectionState$
      .pipe(take(1))
      .subscribe(res => {
        expect(true).toBeTruthy();
        expect(removeFromLsSpy).toHaveBeenCalled();
        expect(res).toEqual(expectedResult);
      });
  });

  it('should return connectionState$ if wallet connected.', () => {
    const expectedResult = { connected: true, state: stateMock };
    const removeFromLsSpy = spyOn(localStorage, 'removeItem');
    spyOn(service.onboard.state, 'select')
      .and.returnValue(of(stateMock as any));

    service.connectionState$
      .pipe(take(1))
      .subscribe(res => {
        expect(removeFromLsSpy).not.toHaveBeenCalled();
        expect(res).toEqual(expectedResult);
      });
  });
});
