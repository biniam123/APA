import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiedComponent } from './guied.component';

describe('GuiedComponent', () => {
  let component: GuiedComponent;
  let fixture: ComponentFixture<GuiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
