import { TestBed } from '@angular/core/testing';

import { AucWalletConnectService } from './wallet-connect.service';

describe('AucWalletConnectService', () => {
  let service: AucWalletConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucWalletConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
