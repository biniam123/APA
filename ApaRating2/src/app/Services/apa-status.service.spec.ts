import { TestBed } from '@angular/core/testing';

import { ApaStatusService } from './apa-status.service';

describe('ApaStatusService', () => {
  let service: ApaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
