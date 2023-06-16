import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAPAComponent } from './review-apa.component';

describe('ReviewAPAComponent', () => {
  let component: ReviewAPAComponent;
  let fixture: ComponentFixture<ReviewAPAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAPAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
