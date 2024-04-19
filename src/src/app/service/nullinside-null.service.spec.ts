import { TestBed } from '@angular/core/testing';

import { NullinsideNullService } from './nullinside-null.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('NullinsideNullService', () => {
  let service: NullinsideNullService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NullinsideNullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
