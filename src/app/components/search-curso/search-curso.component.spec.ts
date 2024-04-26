import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCursoComponent } from './search-curso.component';

describe('SearchCursoComponent', () => {
  let component: SearchCursoComponent;
  let fixture: ComponentFixture<SearchCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
