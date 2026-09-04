import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TwitchLogin} from '../../../common/components/twitch-login/twitch-login';
import {TwitchBotFaq} from '../twitch-bot-faq/twitch-bot-faq';
import {environment} from '../../../../environments/environment';
import {Meta, Title} from '@angular/platform-browser';
import {TwitchStreamCarousel} from '../components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../../common/interface/twitch-live-bot-users';
import {LoadingIcon} from '../../../common/components/loading-icon/loading-icon';
import {NullinsideTwitchBot} from '../../../service/nullinside-twitch-bot';
import {AnimatedList} from '../../../common/components/animated-list/animated-list.component';
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
  styleUrl: './twitch-bot-index.scss'
})
export class TwitchBotIndex implements OnInit {
  protected readonly environment = environment;
  private metaService: Meta = inject(Meta);
  private titleService: Title = inject(Title);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);
  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);
  protected recentlyBanned = signal<AnimateListItem[]>([]);

  constructor() {
    this.metaService.updateTag({
      name: 'description',
      content: 'Login with your twitch account to get started with the nullinside bot!'
    });

    this.titleService.setTitle('nullinside Twitch Bot');
  }

  ngOnInit(): void {
    this.api.getAllLiveTwitchBotUsers().subscribe(response => {
      this.streams.set(response);
      this.loading.set(false);
    });

    this.timer = setInterval(() => {
      try {
        this.getRecentBotBans();
      } catch (e) {
        console.error(e);
      }
    }, 5000);

    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer);
    });

    this.getRecentBotBans();
  }

  getRecentBotBans(): void {
    this.api.getRecentBotBans().subscribe(bans => {
      this.recentlyBanned.set(
        bans
          .slice()
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .map(ban => ({
            title: ban.twitchUsername,
            text: ban.chatLogs.length > 0 ? `: ${ban.chatLogs[0].message}` : '',
            tooltip: ban.chatLogs.map(c => c.message).join('\n')
          }))
      );
    });
  }
}
