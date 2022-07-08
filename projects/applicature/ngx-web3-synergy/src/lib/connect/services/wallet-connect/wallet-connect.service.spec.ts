import { TestBed } from '@angular/core/testing';

import { W3sWalletConnectService } from './wallet-connect.service';

describe('W3sWalletConnectService', () => {
  let service: W3sWalletConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(W3sWalletConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
