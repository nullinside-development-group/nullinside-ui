import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';
import {TimeSinceCountdown} from '../components/time-since-countdown/time-since-countdown';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
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

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected bansNotFromBot = signal<TwitchChatMessage[]>([]);
  protected chatMessages = signal<TwitchChatMessage[]>([]);
  protected filteredChannel = signal<string | null>(null);
  private onFilteredChannelChanged = effect(() => {
    this.getChatMessages(this.filteredChannel());
  });

  ngOnInit(): void {
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
}
