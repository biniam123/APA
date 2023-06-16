import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRatingComponent } from './final-rating.component';

describe('FinalRatingComponent', () => {
  let component: FinalRatingComponent;
  let fixture: ComponentFixture<FinalRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
