import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMateriaComponent } from './add-materia.component';

describe('AddMateriaComponent', () => {
  let component: AddMateriaComponent;
  let fixture: ComponentFixture<AddMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
