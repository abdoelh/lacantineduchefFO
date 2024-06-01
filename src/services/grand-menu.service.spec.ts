import { TestBed } from '@angular/core/testing';

import { GrandMenuService } from './grand-menu.service';

describe('GrandMenuService', () => {
  let service: GrandMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
