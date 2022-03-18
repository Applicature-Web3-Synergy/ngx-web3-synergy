import { TestBed } from '@angular/core/testing';

import { AucBlockScrollHelperService } from './block-scroll-helper.service';

describe('AucBlockScrollHelperService', () => {
  let service: AucBlockScrollHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucBlockScrollHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
