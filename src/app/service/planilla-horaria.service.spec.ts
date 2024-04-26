import { TestBed } from '@angular/core/testing';

import { PlanillaHorariaService } from './planilla-horaria.service';

describe('PlanillaHorariaService', () => {
  let service: PlanillaHorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanillaHorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
