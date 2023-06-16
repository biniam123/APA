import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageReportComponent } from './single-page-report.component';

describe('SinglePageReportComponent', () => {
  let component: SinglePageReportComponent;
  let fixture: ComponentFixture<SinglePageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
