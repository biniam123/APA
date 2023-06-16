import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApaComponent } from './my-apa.component';

describe('MyApaComponent', () => {
  let component: MyApaComponent;
  let fixture: ComponentFixture<MyApaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
