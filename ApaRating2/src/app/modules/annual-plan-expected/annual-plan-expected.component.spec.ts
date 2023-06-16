import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualPlanExpectedComponent } from './annual-plan-expected.component';

describe('AnnualPlanExpectedComponent', () => {
  let component: AnnualPlanExpectedComponent;
  let fixture: ComponentFixture<AnnualPlanExpectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualPlanExpectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualPlanExpectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
