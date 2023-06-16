import { TestBed } from '@angular/core/testing';

import { CriateriaService } from './criateria.service';

describe('CriateriaService', () => {
  let service: CriateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
