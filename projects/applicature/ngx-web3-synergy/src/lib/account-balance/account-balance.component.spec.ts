/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { Chain } from '@web3-onboard/common/dist/types';
import { Balances } from '@web3-onboard/core/dist/types';
import { AsColorGroup, AsColors, AS_COLOR_GROUP } from '@applicature/styles';

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

function getStylesPropsByColorMock(color: AsColorGroup): W3sSetStyleProp[] {
  const {
    base,
    hover,
    light,
    dark,
    text,
    border,
    borderHover,
    borderFocus
  } = AsColors[color];
  return [
    {
      name: '--w3s-account-balance-base',
      value: base
    },
    {
      name: '--w3s-account-balance-hover',
      value: hover
    },
    {
      name: '--w3s-account-balance-light',
      value: light
    },
    {
      name: '--w3s-account-balance-dark',
      value: dark
    },
    {
      name: '--w3s-account-balance-text',
      value: text
    },
    {
      name: '--w3s-account-balance-border',
      value: border
    },
    {
      name: '--w3s-account-balance-borderHover',
      value: borderHover
    },
    {
      name: '--w3s-account-balance-borderFocus',
      value: borderFocus
    }
  ];
}

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
    const expectedResult = {
      value: Object.values(balance)[0],
      currency: Object.keys(balance)[0]
    }
    component.balance = null;

    walletConnectService.balanceVal = balance;

    expect(component.balance).toEqual(expectedResult);
  });

  it('should set balance to null value if balance changed.', () => {
    const balance: Balances = {};
    const expectedResult = null;
    component.balance = {
      value: '1',
      currency: 'ETH'
    };

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
    const colorToSet = AS_COLOR_GROUP.RED;
    const expectedResult: W3sSetStyleProp[] = getStylesPropsByColorMock(colorToSet);
    component.color = colorToSet;
    component.styleProperties = [];

    component.ngOnChanges();

    expect(component.styleProperties).toEqual(expectedResult);
  });

  it('should set styleProperties when ngOnChanges if no color.', () => {
    const expectedResult: W3sSetStyleProp[] = getStylesPropsByColorMock(AS_COLOR_GROUP.WHITE);
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
