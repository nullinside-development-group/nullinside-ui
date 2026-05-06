import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {TwitchLogin} from '../../../common/components/twitch-login/twitch-login';
import {TwitchBotFaq} from "../twitch-bot-faq/twitch-bot-faq";
import {environment} from "../../../../environments/environment";
import {Meta, Title} from '@angular/platform-browser';
import {TwitchStreamCarousel} from '../components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../../common/interface/twitch-live-bot-users';
import {LoadingIcon} from '../../../common/components/loading-icon/loading-icon';
import {NullinsideTwitchBot} from '../../../service/nullinside-twitch-bot';
import {AnimatedList} from '../../../common/components/animated-list/animated-list.component';
import {interval, Subscription} from 'rxjs';
import {AnimateListItem} from '../../../common/interface/animate-list-item';

@Component({
  selector: 'app-twitch-bot-index',
  imports: [
    TwitchLogin,
    TwitchBotFaq,
    TwitchStreamCarousel,
    LoadingIcon,
    AnimatedList
  ],
  templateUrl: './twitch-bot-index.html',
  styleUrl: './twitch-bot-index.scss',
  standalone: true
})
export class TwitchBotIndex implements OnInit, OnDestroy {
  protected readonly environment = environment;
  private metaService: Meta = inject(Meta);
  private titleService: Title = inject(Title);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);
  private timer: Subscription | null = null;

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);
  protected recentlyBanned = signal<Record<string, AnimateListItem>>({});
  protected recentlyBannedForDisplay = computed(() => Object.values(this.recentlyBanned()));

  constructor() {
    this.metaService.updateTag({
      name: 'description',
      content: 'Login with your twitch account to get started with the nullinside bot!'
    });

    this.titleService.setTitle("nullinside Twitch Bot");
  }

  ngOnDestroy(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.api.getAllLiveTwitchBotUsers().subscribe(response => {
      this.streams.set(response);
      this.loading.set(false);
    });

    this.timer = interval(5000).subscribe({
      next: () => {
        this.getRecentBotBans()
      },
      error: err => {
        console.error(err)
      }
    });

    this.getRecentBotBans();
  }

  getRecentBotBans(): void {
    this.api.getRecentBotBans().subscribe(bans => {
      // Sort by timestamp descending
      const sortedBans = bans.slice().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      this.recentlyBanned.update(currentMap => {
        // Since this is a complex type and TypeScript compares them by reference, we need to check if the array has
        // actually changed before interacting with the recentlyBanned collection. If we just update the array with the
        // intended new values, the same exact rows will be considered different (by reference) and force an update
        // every single cycle.
        const updatedMap: Record<string, AnimateListItem> = {...currentMap};

        sortedBans.forEach(ban => {
          const key = ban.twitchUsername;
          const newItem: AnimateListItem = {
            text: ban.chatLogs.length > 0 ? `${key}: ${ban.chatLogs[0].message}` : key,
            tooltip: ban.chatLogs.map(c => c.message).join('\n')
          };

          const existingItem = updatedMap[key];

          // Only update if content changed
          if (!existingItem || existingItem.text !== newItem.text || existingItem.tooltip !== newItem.tooltip) {
            updatedMap[key] = newItem;
          }
        });

        // Remove keys that are no longer in the latest bans
        Object.keys(updatedMap).forEach(key => {
          if (!sortedBans.find(b => b.twitchUsername === key)) {
            delete updatedMap[key];
          }
        });

        return updatedMap;
      });
    });
  }
}
