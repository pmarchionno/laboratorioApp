import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartamentoComponent } from './list-departamento.component';

describe('ListDepartamentoComponent', () => {
  let component: ListDepartamentoComponent;
  let fixture: ComponentFixture<ListDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
