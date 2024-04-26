import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanillaHorariaComponent } from './add-planilla-horaria.component';

describe('AddPlanillaHorariaComponent', () => {
  let component: AddPlanillaHorariaComponent;
  let fixture: ComponentFixture<AddPlanillaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanillaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanillaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
