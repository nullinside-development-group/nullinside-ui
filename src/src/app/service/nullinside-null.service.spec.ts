import { TestBed } from '@angular/core/testing';

import { NullinsideNullService } from './nullinside-null.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NullinsideNullService', () => {
  let service: NullinsideNullService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(NullinsideNullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
