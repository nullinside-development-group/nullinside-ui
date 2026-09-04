import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, convertToParamMap, provideRouter, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {TwitchBotAdmin} from './twitch-bot-admin';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';

describe('TwitchBotAdmin', () => {
  let component: TwitchBotAdmin;
  let fixture: ComponentFixture<TwitchBotAdmin>;
  let router: Router;
  let queryParamMapSubject: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: vi.fn()
    });

    queryParamMapSubject = new BehaviorSubject(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [TwitchBotAdmin],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{path: 'twitch/admin', component: TwitchBotAdmin}]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMapSubject.asObservable()
          }
        }
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TwitchBotAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch tab when tab query parameter changes', async () => {
    queryParamMapSubject.next(convertToParamMap({tab: 'missing'}));
    fixture.detectChanges();
    await fixture.whenStable();

    const tabHeaders = fixture.debugElement.queryAll(By.css('.mdc-tab'));
    expect((tabHeaders[1].nativeElement as HTMLElement).classList.contains('mdc-tab--active')).toBe(true);

    queryParamMapSubject.next(convertToParamMap({tab: 'chat'}));
    fixture.detectChanges();
    await fixture.whenStable();
    expect((tabHeaders[0].nativeElement as HTMLElement).classList.contains('mdc-tab--active')).toBe(true);
  });

  it('should call scrollToBottomOfChat and navigate when tab changes', async () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const chatsChatElement = fixture.debugElement.query(By.directive(AutoScrollingChat));
    expect(chatsChatElement).toBeTruthy();
    const chatsChat = chatsChatElement.componentInstance as AutoScrollingChat;
    const chatsChatSpy = vi.spyOn(chatsChat, 'scrollToBottomOfChat');

    const tabHeaders = fixture.debugElement.queryAll(By.css('.mdc-tab'));
    expect(tabHeaders.length).toBe(2);

    // Switch to Missed Bans tab (tab 1)
    (tabHeaders[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const allChatElements = fixture.debugElement.queryAll(By.directive(AutoScrollingChat));
    const missedBansChat = allChatElements[allChatElements.length - 1].componentInstance as AutoScrollingChat;
    const missedBansChatSpy = vi.spyOn(missedBansChat, 'scrollToBottomOfChat');

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: expect.anything() as object,
      queryParams: {tab: 'missing'}
    });

    // Switch back to Chats tab (tab 0)
    (tabHeaders[0].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(chatsChatSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: expect.anything() as object,
      queryParams: {tab: 'chats'}
    });

    // Switch again to Missed Bans tab (tab 1)
    (tabHeaders[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(missedBansChatSpy).toHaveBeenCalled();
  });
});
