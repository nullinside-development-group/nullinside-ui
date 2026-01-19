import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchBotFaq} from './twitch-bot-faq';

describe('TwitchBotFaq', () => {
  let component: TwitchBotFaq;
  let fixture: ComponentFixture<TwitchBotFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotFaq]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchBotFaq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
