import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaHorariaComponent } from './planilla-horaria.component';

describe('PlanillaHorariaComponent', () => {
  let component: PlanillaHorariaComponent;
  let fixture: ComponentFixture<PlanillaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanillaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
