import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchBotConfig} from './twitch-bot-config';
import {provideRouter} from '@angular/router';

describe('TwitchBotConfig', () => {
  let component: TwitchBotConfig;
  let fixture: ComponentFixture<TwitchBotConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotConfig],
      providers: [provideRouter([{path: 'twitch/bot', component: TwitchBotConfig}])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchBotConfig);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
