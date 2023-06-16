import { TestBed } from '@angular/core/testing';

import { ExceptionObjectvieService } from './exception-objectvie.service';

describe('ExceptionObjectvieService', () => {
  let service: ExceptionObjectvieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionObjectvieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
