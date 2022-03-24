import { TestBed } from '@angular/core/testing';

import { AucDialogService } from './dialog.service';

describe('AucDialogService', () => {
  let service: AucDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
