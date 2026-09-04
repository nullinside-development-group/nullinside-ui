import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {TwitchBotAdmin} from './twitch-bot-admin';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';

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

  it('should call scrollToBottomOfChat on the corresponding chat when tab changes', async () => {
    const chatsChatElement = fixture.debugElement.query(By.directive(AutoScrollingChat));
    expect(chatsChatElement).toBeTruthy();
    const chatsChat = chatsChatElement.componentInstance as AutoScrollingChat;
    const chatsChatSpy = vi.spyOn(chatsChat, 'scrollToBottomOfChat');

    const tabHeaders = fixture.debugElement.queryAll(By.css('.mdc-tab'));
    expect(tabHeaders.length).toBe(3);

    // Switch to Missed Bans tab (tab 1)
    (tabHeaders[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const allChatElements = fixture.debugElement.queryAll(By.directive(AutoScrollingChat));
    const missedBansChat = allChatElements[allChatElements.length - 1].componentInstance as AutoScrollingChat;
    const missedBansChatSpy = vi.spyOn(missedBansChat, 'scrollToBottomOfChat');

    // Switch back to Chats tab (tab 0)
    (tabHeaders[0].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(chatsChatSpy).toHaveBeenCalled();

    // Switch again to Missed Bans tab (tab 1)
    (tabHeaders[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(missedBansChatSpy).toHaveBeenCalled();
  });
});
