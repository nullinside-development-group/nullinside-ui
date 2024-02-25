import { TestBed } from '@angular/core/testing';

import { NullinsideService } from './nullinside.service';

describe('NullinsideService', () => {
  let service: NullinsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullinsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
