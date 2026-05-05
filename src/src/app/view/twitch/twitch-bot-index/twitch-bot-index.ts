import {Component, inject, OnInit, signal} from '@angular/core';
import {TwitchLogin} from '../../../common/components/twitch-login/twitch-login';
import {TwitchBotFaq} from "../twitch-bot-faq/twitch-bot-faq";
import {environment} from "../../../../environments/environment";
import {Meta, Title} from '@angular/platform-browser';
import {TwitchStreamCarousel} from '../../../common/components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../../common/interface/twitch-live-bot-users';
import {LoadingIcon} from '../../../common/components/loading-icon/loading-icon';
import {NullinsideTwitchBot} from '../../../service/nullinside-twitch-bot';

@Component({
  selector: 'app-twitch-bot-index',
  imports: [
    TwitchLogin,
    TwitchBotFaq,
    TwitchStreamCarousel,
    LoadingIcon
  ],
  templateUrl: './twitch-bot-index.html',
  styleUrl: './twitch-bot-index.scss',
  standalone: true
})
export class TwitchBotIndex implements OnInit {
  protected readonly environment = environment;
  private metaService: Meta = inject(Meta);
  private titleService: Title = inject(Title);
  private api: NullinsideTwitchBot = inject(NullinsideTwitchBot);
  protected streams = signal<TwitchLiveBotUsers[]>([]);
  protected loading = signal(true);

  constructor() {
    this.metaService.updateTag({
      name: 'description',
      content: 'Login with your twitch account to get started with the nullinside bot!'
    });

    this.titleService.setTitle("nullinside Twitch Bot");
  }

  ngOnInit(): void {
    this.api.getAllLiveTwitchBotUsers().subscribe(response => {
      this.streams.set(response);
      this.loading.set(false);
    });
  }
}
