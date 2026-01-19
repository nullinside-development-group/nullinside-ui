import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchLogin} from './twitch-login';

describe('TwitchLogin', () => {
  let component: TwitchLogin;
  let fixture: ComponentFixture<TwitchLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchLogin]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
