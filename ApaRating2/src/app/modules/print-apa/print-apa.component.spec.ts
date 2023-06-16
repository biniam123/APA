import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintApaComponent } from './print-apa.component';

describe('PrintApaComponent', () => {
  let component: PrintApaComponent;
  let fixture: ComponentFixture<PrintApaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintApaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintApaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
