import {Component, computed, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
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
  private scrollChat = false;

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);

  protected messages = signal<Record<string, TwitchChatMessage>>({});
  protected messagesForDisplay = computed(() => Object.values(this.messages()));

  ngOnInit(): void {
    this.loadData();
    this.scrollChat = true;

    this.timer = setInterval(() => {
      this.loadData();

      if (this.scrollChat) {
        this.scrollToBottomOfChat();
        this.scrollChat = false;
      }
    }, 1000);

    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer)
    });
  }

  private scrollToBottomOfChat() {
    const element = this.chatConsole?.nativeElement;
    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
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
      const sortedMessages = response.data.slice().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      const wasAtBottom = this.isAtTheBottomOfChat();
      let collectionModified = false;
      this.messages.update(currentMap => {
        // Since this is a complex type and TypeScript compares them by reference, we need to check if the array has
        // actually changed before interacting with the recentlyBanned collection. If we just update the array with the
        // intended new values, the same exact rows will be considered different (by reference) and force an update
        // every single cycle.
        const updatedMap: Record<string, TwitchChatMessage> = {...currentMap};

        sortedMessages.forEach(message => {
          const key = message.id.toString();

          // Only add if it's missing
          if (!updatedMap[key]) {
            updatedMap[key] = {
              id: message.id,
              channel: message.channel,
              sender: message.twitchUsername ?? "Unknown",
              message: message.message ?? "Unknown",
              timestamp: message.timestamp,
              tooltip: `${message.twitchUsername} - ${message.message} [${convertForDisplay(message.timestamp)}]`
            };

            collectionModified = true;
          }
        });

        // Remove messages that are no longer in the chat list
        Object.keys(updatedMap).forEach(key => {
          if (!sortedMessages.find(b => b.id.toString() === key)) {
            delete updatedMap[key];
            collectionModified = true;
          }
        });

        return updatedMap;
      });

      // Only scroll to the bottom if we were at the bottom before the collection was modified and the collection was
      // modified.
      if (wasAtBottom && collectionModified) {
        this.scrollChat = true;
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
