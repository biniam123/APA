import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnualPlanComponent } from './view-annual-plan.component';

describe('ViewAnnualPlanComponent', () => {
  let component: ViewAnnualPlanComponent;
  let fixture: ComponentFixture<ViewAnnualPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnnualPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnnualPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
