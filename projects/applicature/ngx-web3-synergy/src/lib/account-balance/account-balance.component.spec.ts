/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { Chain } from '@web3-onboard/common/dist/types';
import { Balances } from '@web3-onboard/core/dist/types';
import { AS_COLOR_GROUP } from '@applicature/styles';

import { W3sAccountBalanceComponent } from './account-balance.component';
import { W3sPipesModule } from '../pipes';
import { W3sButtonModule } from '../button';
import { W3sIconModule } from '../icon';
import { W3sDirectivesModule, W3sSetStyleProp } from '../directives';
import {
  chainsMock,
  W3sBlockScrollHelperServiceMock,
  W3sDialogServiceMock,
  W3sWalletConnectServiceMock
} from '../connect/services/wallet-connect/mocks';
import { W3sWalletConnectService } from '../connect';
import { W3sBlockScrollHelperService } from '../helpers';
import { W3sDialogService } from '../dialog';


describe('W3sAccountBalanceComponent', () => {
  let component: W3sAccountBalanceComponent;
  let walletConnectService;
  let fixture: ComponentFixture<W3sAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sAccountBalanceComponent ],
      providers: [
        { provide: W3sDialogService, useClass: W3sDialogServiceMock },
        { provide: W3sBlockScrollHelperService, useClass: W3sBlockScrollHelperServiceMock },
        { provide: W3sWalletConnectService, useClass: W3sWalletConnectServiceMock }
      ],
      imports: [
        CommonModule,
        W3sPipesModule,
        W3sIconModule,
        W3sButtonModule,
        W3sDirectivesModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAccountBalanceComponent);
    component = fixture.componentInstance;
    walletConnectService = TestBed.inject(W3sWalletConnectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chainsList if connected.', () => {
    const expectedResult: Chain[] = chainsMock();

    component.ngOnInit();

    expect(component['chainsList']).toEqual(expectedResult);
  });

  it('should set chainsList if not connected.', async () => {
    const expectedResult: Chain[] = [];
    component['chainsList'] = null;
    await walletConnectService.disconnectWallet();

    component.ngOnInit();

    expect(component['chainsList']).toEqual(expectedResult);
  });

  it('should set activeNetwork if chain changed.', () => {
    const expectedResult: Chain = chainsMock()[0];
    component.activeNetwork = null;

    walletConnectService.chainID = expectedResult.id;

    expect(component.activeNetwork).toEqual(expectedResult);
  });

  it('should set balance value if balance changed.', () => {
    const balance: Balances = { ETH: '107' };
    const expectedResult = `${Object.values(balance)[0]} ${Object.keys(balance)[0]}`;
    component.balance = null;

    walletConnectService.balanceVal = balance;

    expect(component.balance).toEqual(expectedResult);
  });

  it('should set balance to null value if balance changed.', () => {
    const balance: Balances = {};
    const expectedResult = null;
    component.balance = '1 ETH';

    walletConnectService.balanceVal = balance;

    expect(component.balance).toEqual(expectedResult);
  });

  it('should set address if account changed.', () => {
    const expectedResult = 'test account address';
    component.address = null;

    walletConnectService.accountsList = [ expectedResult ];

    expect(component.address).toEqual(expectedResult);
  });

  it('should set address if account changed.', () => {
    const expectedResult = 'test account address';
    component.address = null;

    walletConnectService.accountsList = [ expectedResult ];

    expect(component.address).toEqual(expectedResult);
  });

  it('should set identicon if account changed.', () => {
    const expectedResult: HTMLDivElement = `<div></div>` as any;
    component.address = null;
    component.identicon = expectedResult;
    component.showAddress = true;
    component.addressConfig = {
      showIdenticon: true
    };

    walletConnectService.accountsList = [ 'some address' ];

    expect(component.identicon).not.toEqual(expectedResult);
  });

  it('should set styleProperties when ngOnChanges.', () => {
    const expectedResult: W3sSetStyleProp[] = [
      {
        name: '--w3s-account-balance-base',
        value: '#E31B89'
      },
      {
        name: '--w3s-account-balance-hover',
        value: '#E73D9B'
      },
      {
        name: '--w3s-account-balance-light',
        value: '#EE72B6'
      },
      {
        name: '--w3s-account-balance-dark',
        value: '#BC1C74'
      },
      {
        name: '--w3s-account-balance-text',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-border',
        value: '#E31B89'
      },
      {
        name: '--w3s-account-balance-borderHover',
        value: '#E73D9B'
      },
      {
        name: '--w3s-account-balance-borderFocus',
        value: '#BC1C74'
      }
    ];
    component.color = AS_COLOR_GROUP.RED;
    component.styleProperties = [];

    component.ngOnChanges();

    expect(component.styleProperties).toEqual(expectedResult);
  });

  it('should set styleProperties when ngOnChanges if no color.', () => {
    const expectedResult: W3sSetStyleProp[] = [
      {
        name: '--w3s-account-balance-base',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-hover',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-light',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-dark',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-text',
        value: '#072F3F'
      },
      {
        name: '--w3s-account-balance-border',
        value: '#FFF'
      },
      {
        name: '--w3s-account-balance-borderHover',
        value: '#F3F6F8'
      },
      {
        name: '--w3s-account-balance-borderFocus',
        value: '#3EA9D4'
      }
    ];
    component.color = null;
    component.styleProperties = [];

    component.ngOnChanges();

    expect(component.styleProperties).toEqual(expectedResult);
  });

  it('should emit event when clicked.', () => {
    const expectedResult = 'some event';
    const accountClickedSpy: jasmine.Spy<any> = spyOn(component.accountClicked, 'emit');
    component.accountButtonClick(expectedResult);

    expect(accountClickedSpy).toHaveBeenCalledWith(expectedResult);
  });
});
