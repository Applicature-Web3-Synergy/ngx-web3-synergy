import { TestBed } from '@angular/core/testing';

import { W3sDialogService } from './dialog.service';

xdescribe('W3sDialogService', () => {
  let service: W3sDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(W3sDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
