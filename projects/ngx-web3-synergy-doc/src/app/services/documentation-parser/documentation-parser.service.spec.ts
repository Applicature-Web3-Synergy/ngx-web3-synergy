import { TestBed } from '@angular/core/testing';

import { DocumentationParserService } from './documentation-parser.service';


describe('DocumentationParserService', () => {
  let service: DocumentationParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentationParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
