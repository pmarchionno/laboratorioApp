import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHorarioComponent } from './search-horario.component';

describe('SearchHorarioComponent', () => {
  let component: SearchHorarioComponent;
  let fixture: ComponentFixture<SearchHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
