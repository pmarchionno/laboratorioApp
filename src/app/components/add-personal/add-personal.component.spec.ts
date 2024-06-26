import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalComponent } from './add-personal.component';

describe('AddPersonalComponent', () => {
  let component: AddPersonalComponent;
  let fixture: ComponentFixture<AddPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
