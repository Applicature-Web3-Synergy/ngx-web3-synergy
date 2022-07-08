import { TestBed } from '@angular/core/testing';

import { W3sInstallWalletHelperService } from './install-wallet-helper.service';


describe('InstallWalletHelperService', () => {
  let service: W3sInstallWalletHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(W3sInstallWalletHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
