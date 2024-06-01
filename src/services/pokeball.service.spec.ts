import { TestBed } from '@angular/core/testing';

import { PokeballService } from './pokeball.service';

describe('PokeballService', () => {
  let service: PokeballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
