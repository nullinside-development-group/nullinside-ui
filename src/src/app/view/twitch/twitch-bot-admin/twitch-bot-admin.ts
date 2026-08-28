import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {TwitchLiveBotUsers} from '../../../common/interface/twitch-live-bot-users';
import {NullinsideTwitchBot} from '../../../service/nullinside-twitch-bot';
import {convertForDisplay} from '../../../common/constants';
import {TwitchChatMessage} from '../../../common/interface/twitch-chat-message';
import {MatTableModule} from '@angular/material/table';
import {MatTooltip} from '@angular/material/tooltip';
import {LoadingIcon} from '../../../common/components/loading-icon/loading-icon';
import {TimestampPipe} from '../../../common/pipe/timestamp.pipe';

@Component({
  selector: 'app-twitch-bot-admin',
  imports: [
    LoadingIcon,
    MatTableModule,
    MatTooltip,
    TimestampPipe
  ],
  templateUrl: './twitch-bot-admin.html',
  styleUrl: './twitch-bot-admin.scss',
})
export class TwitchBotAdmin implements OnInit {
  @ViewChild('chatConsole')
  chatConsole?: ElementRef<HTMLDivElement>;

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);

  protected messages = signal<TwitchChatMessage[]>([]);

  ngOnInit(): void {
    this.loadData();
    setTimeout(() => this.scrollToBottomOfChat());
    this.timer = setInterval(() => this.loadData(), 1000);
    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer);
    });
  }

  private scrollToBottomOfChat() {
    const element = this.chatConsole?.nativeElement;
    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
  }

  private isAtTheBottomOfChat() {
    const element = this.chatConsole?.nativeElement;
    if (!element) {
      return false;
    }

    return (element.clientHeight + element.scrollTop) >= element.scrollHeight;
  }

  private loadData() {
    this.api.getAllLiveTwitchBotUsers().subscribe(response => {
      this.streams.set(response);
      this.loading.set(false);
    });

    this.api.getAllChatMessages().subscribe(response => {
      const wasAtBottom = this.isAtTheBottomOfChat();

      this.messages.set(
        response.data.map(message => ({
          id: message.id,
          channel: message.channel,
          sender: message.twitchUsername ?? 'Unknown',
          message: message.message ?? 'Unknown',
          timestamp: message.timestamp,
          tooltip: `${message.twitchUsername} - ${message.message} [${convertForDisplay(message.timestamp)}]`
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      );

      if (wasAtBottom) {
        setTimeout(() => this.scrollToBottomOfChat());
      }
    });
  }

  protected isToday(timestamp: Date): boolean {
    const date = new Date(timestamp);
    const today = new Date();

    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }
}
