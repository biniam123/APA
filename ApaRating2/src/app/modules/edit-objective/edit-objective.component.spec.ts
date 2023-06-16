import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjectiveComponent } from './edit-objective.component';

describe('EditObjectiveComponent', () => {
  let component: EditObjectiveComponent;
  let fixture: ComponentFixture<EditObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditObjectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
