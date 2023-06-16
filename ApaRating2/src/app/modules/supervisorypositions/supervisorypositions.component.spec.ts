import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPERVISORYPOSITIONSComponent } from './supervisorypositions.component';

describe('SUPERVISORYPOSITIONSComponent', () => {
  let component: SUPERVISORYPOSITIONSComponent;
  let fixture: ComponentFixture<SUPERVISORYPOSITIONSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPERVISORYPOSITIONSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPERVISORYPOSITIONSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
