import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExceptionComponent } from './view-exception.component';

describe('ViewExceptionComponent', () => {
  let component: ViewExceptionComponent;
  let fixture: ComponentFixture<ViewExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
