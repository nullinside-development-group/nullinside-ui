import {TestBed} from '@angular/core/testing';

import {Nullinside} from './nullinside';

describe('Nullinside', () => {
  let service: Nullinside;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nullinside);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
