import {TestBed} from '@angular/core/testing';

import {NullinsideTwitchBot} from './nullinside-twitch-bot';

describe('NullinsideTwitchBot', () => {
  let service: NullinsideTwitchBot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullinsideTwitchBot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
