import { TestBed } from '@angular/core/testing';

import { ApaRatingService } from './apa-rating.service';

describe('ApaRatingService', () => {
  let service: ApaRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApaRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
