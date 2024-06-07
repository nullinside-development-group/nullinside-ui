import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchBotConfigComponent} from './twitch-bot-config.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";

describe('TwitchBotConfigComponent', () => {
  let component: TwitchBotConfigComponent;
  let fixture: ComponentFixture<TwitchBotConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotConfigComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchBotConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
