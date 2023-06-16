import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintallComponent } from './printall.component';

describe('PrintallComponent', () => {
  let component: PrintallComponent;
  let fixture: ComponentFixture<PrintallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
