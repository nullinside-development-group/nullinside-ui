import { TestBed } from '@angular/core/testing';

import { NullinsideNullService } from './nullinside-null.service';

describe('NullinsideNullService', () => {
  let service: NullinsideNullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullinsideNullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
