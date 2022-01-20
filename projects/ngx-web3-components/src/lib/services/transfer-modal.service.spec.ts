import { TestBed } from '@angular/core/testing';

import { TransferModalService } from './transfer-modal.service';

describe('TransferModalService', () => {
  let service: TransferModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
