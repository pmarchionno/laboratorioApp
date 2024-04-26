import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonalComponent } from './search-personal.component';

describe('SearchPersonalComponent', () => {
  let component: SearchPersonalComponent;
  let fixture: ComponentFixture<SearchPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
