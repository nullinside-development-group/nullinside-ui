import {TestBed} from '@angular/core/testing';

import {NullinsideTwitchBotService} from './nullinside-twitch-bot.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('NullinsideTwitchBotService', () => {
  let service: NullinsideTwitchBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(NullinsideTwitchBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
