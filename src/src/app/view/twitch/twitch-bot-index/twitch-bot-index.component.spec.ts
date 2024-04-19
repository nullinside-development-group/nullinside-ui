import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBotIndexComponent } from './twitch-bot-index.component';

describe('TwitchBotIndexComponent', () => {
  let component: TwitchBotIndexComponent;
  let fixture: ComponentFixture<TwitchBotIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchBotIndexComponent]
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
