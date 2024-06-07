import {TestBed} from '@angular/core/testing';

import {NullinsideService} from './nullinside.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('NullinsideService', () => {
  let service: NullinsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(NullinsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
