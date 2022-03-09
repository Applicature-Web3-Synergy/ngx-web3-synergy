import { TestBed } from '@angular/core/testing';

import { ApplicatureBlockScrollHelperService } from './applicature-block-scroll-helper.service';

describe('ApplicatureBlockScrollHelperService', () => {
  let service: ApplicatureBlockScrollHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicatureBlockScrollHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
