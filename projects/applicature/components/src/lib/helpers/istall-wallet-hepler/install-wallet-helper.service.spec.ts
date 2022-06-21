import { TestBed } from '@angular/core/testing';

import { AucInstallWalletHelperService } from './install-wallet-helper.service';


describe('InstallWalletHelperService', () => {
  let service: AucInstallWalletHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucInstallWalletHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
