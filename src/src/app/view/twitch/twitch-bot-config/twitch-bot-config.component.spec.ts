import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBotConfigComponent } from './twitch-bot-config.component';

describe('TwitchBotConfigComponent', () => {
  let component: TwitchBotConfigComponent;
  let fixture: ComponentFixture<TwitchBotConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotConfigComponent]
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
