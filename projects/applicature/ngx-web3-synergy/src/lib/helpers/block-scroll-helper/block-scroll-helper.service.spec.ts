import { TestBed } from '@angular/core/testing';

import { W3sBlockScrollHelperService } from './block-scroll-helper.service';

xdescribe('W3sBlockScrollHelperService', () => {
  let service: W3sBlockScrollHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(W3sBlockScrollHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
