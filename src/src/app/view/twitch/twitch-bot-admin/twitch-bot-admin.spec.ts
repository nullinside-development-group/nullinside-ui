import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TwitchBotAdmin} from './twitch-bot-admin';

describe('TwitchBotAdmin', () => {
  let component: TwitchBotAdmin;
  let fixture: ComponentFixture<TwitchBotAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotAdmin],
      providers: [provideHttpClient(), provideHttpClientTesting()]
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
