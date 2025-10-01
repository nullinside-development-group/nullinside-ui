import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchBotIndexComponent} from './twitch-bot-index.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('TwitchBotIndexComponent', () => {
  let component: TwitchBotIndexComponent;
  let fixture: ComponentFixture<TwitchBotIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotIndexComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchBotIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
