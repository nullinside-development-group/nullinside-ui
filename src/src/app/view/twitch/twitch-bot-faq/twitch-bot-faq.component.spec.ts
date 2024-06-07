import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBotFaqComponent } from './twitch-bot-faq.component';

describe('TwitchBotFaqComponent', () => {
  let component: TwitchBotFaqComponent;
  let fixture: ComponentFixture<TwitchBotFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwitchBotFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
