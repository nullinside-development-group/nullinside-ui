import { TestBed } from '@angular/core/testing';

import { NullinsideService } from './nullinside.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NullinsideService', () => {
  let service: NullinsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NullinsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
