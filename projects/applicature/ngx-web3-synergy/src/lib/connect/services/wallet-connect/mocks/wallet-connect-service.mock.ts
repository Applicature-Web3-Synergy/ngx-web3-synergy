import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { OnboardAPI } from '@web3-onboard/core';
import { Balances } from '@web3-onboard/core/dist/types';

import { W3sChain, W3sInitOptions, W3sWalletConfig } from '../interfaces';
import { W3sWalletConnectService } from '../wallet-connect.service';
import { OnboardAPIMock } from './onboard-api.mock';
import { W3sBlockScrollHelperService } from '../../../../helpers';
import { W3sDialogService } from '../../../../dialog';
import { InitializationConfigMock } from './initialization-config.mock';
import { W3sLocalStorageService } from '../../../../services';


@Injectable()
export class W3sWalletConnectServiceMock extends W3sWalletConnectService {
  set chainID(chainId) {
    this['_chain$'].next(chainId);
  }

  set accountsList(accounts: string[]) {
    this['_accounts$'].next(accounts ?? [`091x...3${Math.floor(Math.random() * 100)}`]);
  }

  set balanceVal(balance: Balances) {
    this['_balance$'].next(balance);
  }

  set onboardInstance(val: OnboardAPI) {
    this['_onboard'] = val;
  }

  constructor(
    private blockScrollHelperService: W3sBlockScrollHelperService,
    private dialogService: W3sDialogService,
    private localStorageService: W3sLocalStorageService
    ) {
    super(blockScrollHelperService, dialogService, localStorageService);

    this.initialize(InitializationConfigMock)
      .subscribe()
      .unsubscribe();
  }

  public override initialize(config: W3sInitOptions): Observable<void> {
    this['_initializationConfig'] = config;
    config.wallets.forEach((wallet: W3sWalletConfig, index: number) =>
      this['_initializedWalletsMap'].set(wallet.label, { ...wallet, position: index }));

    (config?.chains ?? []).forEach(({
                                      id,
                                      blockExplorerUrl,
                                      blockExplorerApiUrl
                                    }: W3sChain) => {

      this['_blockExplorerUrlByChainId'][id] = {
        blockExplorerUrl,
        blockExplorerApiUrl
      };
    });

    this.onboardInstance = new OnboardAPIMock();
    this.initWeb3();
    this['_onboardInitialized$'].next();

    return of(null);
  }

}
