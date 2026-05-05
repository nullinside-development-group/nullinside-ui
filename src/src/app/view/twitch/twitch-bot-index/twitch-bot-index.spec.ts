import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

import {TwitchBotIndex} from './twitch-bot-index';

describe('TwitchBotIndex', () => {
  let component: TwitchBotIndex;
  let fixture: ComponentFixture<TwitchBotIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotIndex],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchBotIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
