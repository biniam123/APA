import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NONSUPERVISORYPOSITIONSComponent } from './nonsupervisorypositions.component';

describe('NONSUPERVISORYPOSITIONSComponent', () => {
  let component: NONSUPERVISORYPOSITIONSComponent;
  let fixture: ComponentFixture<NONSUPERVISORYPOSITIONSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NONSUPERVISORYPOSITIONSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NONSUPERVISORYPOSITIONSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
