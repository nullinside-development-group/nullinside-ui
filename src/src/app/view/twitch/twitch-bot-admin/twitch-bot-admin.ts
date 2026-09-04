import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';
import {TimeSinceCountdown} from '../components/time-since-countdown/time-since-countdown';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {NullinsideTwitchBot} from '../../../service/nullinside-twitch-bot';
import {TwitchChatMessage} from '../../../common/interface/twitch-chat-message';

@Component({
  selector: 'app-twitch-bot-admin',
  imports: [
    AutoScrollingChat,
    TimeSinceCountdown,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './twitch-bot-admin.html',
  styleUrl: './twitch-bot-admin.scss',
})
export class TwitchBotAdmin implements OnInit {
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected bansNotFromBot = signal<TwitchChatMessage[]>([]);
  protected chatMessages = signal<TwitchChatMessage[]>([]);
  protected filteredChannel = signal<string | null>(null);
  protected selectedTabIndex = signal<number>(0);
  private onFilteredChannelChanged = effect(() => {
    this.getChatMessages(this.filteredChannel());
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      this.selectedTabIndex.set(this.getTabIndex(tab));
    });

    this.getChatMessages();
    this.timer = setInterval(() => {
      this.getChatMessages(this.filteredChannel());
    }, 5000);
    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer);
    });

    this.api.getBansNotFromBot().subscribe(response => {
      this.bansNotFromBot.set(response.map(message => ({
          id: message.id,
          channel: message.channel,
          sender: message.twitchUsername,
          message: message.message,
          timestamp: message.timestamp
        }))
          .sort((a, b) =>
            a.message.localeCompare(b.message) ||
            a.sender.localeCompare(b.sender) ||
            a.channel.localeCompare(b.channel) ||
            b.timestamp.getTime() - a.timestamp.getTime()
          )
      );
    });
  }

  getChatMessages(channel: string | null = null) {
    this.api.getAllChatMessages(channel).subscribe(response => {
      this.chatMessages.set(
        response.data.map(message => ({
          id: message.id,
          channel: message.channel,
          sender: message.twitchUsername ?? 'Unknown',
          message: message.message ?? 'Unknown',
          timestamp: message.timestamp
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      );
    });
  }

  onTabChanged(event: MatTabChangeEvent, chatsChat?: AutoScrollingChat, missedBansChat?: AutoScrollingChat): void {
    this.selectedTabIndex.set(event.index);

    let tabName = '';
    if (event.index === 0) {
      chatsChat?.scrollToBottomOfChat();
      tabName = 'chats';
    } else if (event.index === 1) {
      missedBansChat?.scrollToBottomOfChat();
      tabName = 'missing';
    }

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: tabName}
    });
  }

  private getTabIndex(tab: string | null): number {
    if (!tab) {
      return 0;
    }

    const tabLower = tab.toLowerCase();
    if (tabLower === 'missing') {
      return 1;
    } else if (tabLower === 'chats') {
      return 0;
    }

    return 0;
  }
}
