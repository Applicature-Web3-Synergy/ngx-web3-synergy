import { TestBed } from '@angular/core/testing';

import { BaseSubscriber } from './base-subscriber.service';

xdescribe('BaseSubscriber', () => {
  let service: BaseSubscriber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseSubscriber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
