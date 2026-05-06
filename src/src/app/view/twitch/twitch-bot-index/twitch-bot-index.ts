import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
  protected botUserNames = signal<string[]>([]);

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

    this.timer = interval(5000)
      .subscribe({
        next: _ => {
          this.getRecentBotBans();
        },
        error: err => {
          console.error(err);
        }
      });

    this.getRecentBotBans();
  }

  getRecentBotBans(): void {
    this.api.getRecentBotBans().subscribe(bans => {
      this.botUserNames.update(_ => {
        const newNames = [...bans];
        newNames.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        return newNames.map(ban => ban.twitchUsername);
      });
    });
  }
}
