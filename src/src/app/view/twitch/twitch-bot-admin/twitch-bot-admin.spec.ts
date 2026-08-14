import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBotAdmin } from './twitch-bot-admin';

describe('TwitchBotAdmin', () => {
  let component: TwitchBotAdmin;
  let fixture: ComponentFixture<TwitchBotAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitchBotAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
