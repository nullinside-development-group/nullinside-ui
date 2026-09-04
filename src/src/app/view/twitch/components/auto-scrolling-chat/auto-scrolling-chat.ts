import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {TwitchLiveBotUsers} from '../../../../common/interface/twitch-live-bot-users';
import {NullinsideTwitchBot} from '../../../../service/nullinside-twitch-bot';
import {TwitchChatMessage} from '../../../../common/interface/twitch-chat-message';
import {convertForDisplay} from '../../../../common/constants';
import {MatIcon} from '@angular/material/icon';
import {TimestampPipe} from '../../../../common/pipe/timestamp.pipe';
import {LoadingIcon} from '../../../../common/components/loading-icon/loading-icon';
import {NgClass} from '@angular/common';

@Component({
  imports: [
    MatIcon,
    TimestampPipe,
    LoadingIcon,
    NgClass
  ],
  selector: 'app-auto-scrolling-chat',
  styleUrl: './auto-scrolling-chat.scss',
  templateUrl: './auto-scrolling-chat.html',
})
export class AutoScrollingChat implements OnInit {
  @ViewChild('chatConsole')
  chatConsole?: ElementRef<HTMLDivElement>;

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);

  protected chatMessages = signal<TwitchChatMessage[]>([]);
  public chatIsWrapping = model(true);
  public chatFilteredToChannel = input<string | null>(null);
  private onChatFilteredToChannel = effect(() => {
    this.loadData(this.chatFilteredToChannel());
    this.scrollToBottomOfChat();
  });

  ngOnInit(): void {
    this.loadData();
    this.scrollToBottomOfChat();
    this.timer = setInterval(() => {
      this.loadData(this.chatFilteredToChannel());
    }, 5000);
    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer);
    });
  }

  /**
   * Whenever the control becomes visible again, scroll to the bottom of the chat.
   *
   * @remarks
   * This is required because the browser will not scroll when it is not visible to save on
   * CPU resources. This will force it to the bottom when it gets visibility again.
   */
  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.scrollToBottomOfChat();
    }
  }

  public scrollToBottomOfChat() {
    setTimeout(() => {
      const element = this.chatConsole?.nativeElement;
      if (!element) {
        return;
      }

      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }, 200);
  }

  private isAtTheBottomOfChat() {
    const element = this.chatConsole?.nativeElement;
    if (!element) {
      return false;
    }

    const epsilon = 50;
    const distanceFromBottom = element.scrollHeight - element.clientHeight - element.scrollTop;
    return distanceFromBottom <= epsilon;
  }

  private loadData(channel: string | null = null) {
    this.api.getAllChatMessages(channel).subscribe(response => {
      const wasAtBottom = this.isAtTheBottomOfChat();

      this.chatMessages.set(
        response.data.map(message => ({
          id: message.id,
          channel: message.channel,
          sender: message.twitchUsername ?? 'Unknown',
          message: message.message ?? 'Unknown',
          timestamp: message.timestamp,
          tooltip: `${message.twitchUsername ?? 'Unknown'} - ${message.message ?? 'Unknown'} [${convertForDisplay(message.timestamp)}]`
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      );

      if (wasAtBottom) {
        this.scrollToBottomOfChat();
      }

      this.loading.set(false);
    });
  }

  protected isToday(timestamp: Date): boolean {
    const date = new Date(timestamp);
    const today = new Date();

    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }

  protected setChatWrap(wrap: boolean) {
    const isAtBottom = this.isAtTheBottomOfChat();
    this.chatIsWrapping.set(wrap);

    if (isAtBottom) {
      this.scrollToBottomOfChat();
    }
  }
}
