import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMateriaComponent } from './search-materia.component';

describe('SearchMateriaComponent', () => {
  let component: SearchMateriaComponent;
  let fixture: ComponentFixture<SearchMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
