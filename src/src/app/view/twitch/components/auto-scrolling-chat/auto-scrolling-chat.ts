import {Component, effect, ElementRef, HostListener, input, model, signal, ViewChild} from '@angular/core';
import {TwitchLiveBotUsers} from '../../../../common/interface/twitch-live-bot-users';
import {TwitchChatMessage} from '../../../../common/interface/twitch-chat-message';
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
export class AutoScrollingChat {
  @ViewChild('chatConsole')
  chatConsole?: ElementRef<HTMLDivElement>;

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);

  public chatMessages = input<TwitchChatMessage[]>([]);
  public chatIsWrapping = model(true);
  private onChatMessagesUpdated = effect(() => {
    // Required for the effect to tie to the chat messages.
    this.chatMessages();

    const wasAtBottom = this.isAtTheBottomOfChat();
    if (wasAtBottom || this.loading()) {
      this.scrollToBottomOfChat();
    }

    this.loading.set(false);
  });

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
