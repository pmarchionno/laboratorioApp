import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanillaHorariaComponent } from './list-planilla-horaria.component';

describe('ListPlanillaHorariaComponent', () => {
  let component: ListPlanillaHorariaComponent;
  let fixture: ComponentFixture<ListPlanillaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlanillaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanillaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
