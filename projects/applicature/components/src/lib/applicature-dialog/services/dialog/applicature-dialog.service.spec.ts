import { TestBed } from '@angular/core/testing';

import { ApplicatureDialogService } from './applicature-dialog.service';

describe('ApplicatureDialogService', () => {
  let service: ApplicatureDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicatureDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
