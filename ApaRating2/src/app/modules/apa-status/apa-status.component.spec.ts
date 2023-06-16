import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApaStatusComponent } from './apa-status.component';

describe('ApaStatusComponent', () => {
  let component: ApaStatusComponent;
  let fixture: ComponentFixture<ApaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
