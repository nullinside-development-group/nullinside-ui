import {TestBed} from '@angular/core/testing';

import {NullinsideNull} from './nullinside-null';

describe('NullinsideNull', () => {
  let service: NullinsideNull;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullinsideNull);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
