import { TestBed } from '@angular/core/testing';

import { IsloggedinService } from './isloggedin.service';

describe('IsloggedinService', () => {
  let service: IsloggedinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsloggedinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
