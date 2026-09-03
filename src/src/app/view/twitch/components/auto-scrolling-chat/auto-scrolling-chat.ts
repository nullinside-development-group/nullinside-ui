import {Component, DestroyRef, ElementRef, inject, model, OnInit, signal, ViewChild} from '@angular/core';
import {TwitchLiveBotUsers} from '../../../../common/interface/twitch-live-bot-users';
import {NullinsideTwitchBot} from '../../../../service/nullinside-twitch-bot';
import {TwitchChatMessage} from '../../../../common/interface/twitch-chat-message';
import {convertForDisplay} from '../../../../common/constants';
import {MatIcon} from '@angular/material/icon';
import {TimestampPipe} from '../../../../common/pipe/timestamp.pipe';
import {LoadingIcon} from '../../../../common/components/loading-icon/loading-icon';
import {MatTooltip} from '@angular/material/tooltip';
import {NgClass} from '@angular/common';

@Component({
  imports: [
    MatIcon,
    TimestampPipe,
    LoadingIcon,
    MatTooltip,
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

  protected messages = signal<TwitchChatMessage[]>([]);
  public wrappingChat = model(true);

  ngOnInit(): void {
    this.loadData();
    setTimeout(() => {
      this.scrollToBottomOfChat();
    }, 500);
    this.timer = setInterval(() => {
      this.loadData();
    }, 5000);
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

    const epsilon = 50;
    const distanceFromBottom = element.scrollHeight - element.clientHeight - element.scrollTop;
    return distanceFromBottom <= epsilon;
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
          tooltip: `${message.twitchUsername ?? 'Unknown'} - ${message.message ?? 'Unknown'} [${convertForDisplay(message.timestamp)}]`
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      );

      if (wasAtBottom) {
        setTimeout(() => {
          this.scrollToBottomOfChat();
        }, 500);
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

  protected setChatWrap(wrap: boolean) {
    const isAtBottom = this.isAtTheBottomOfChat();
    this.wrappingChat.set(wrap);

    if (isAtBottom) {
      setTimeout(() => {
        this.scrollToBottomOfChat();
      }, 500);
    }
  }
}
