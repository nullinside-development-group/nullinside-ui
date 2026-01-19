import {Component, inject} from '@angular/core';
import {StandardBanner} from '../../../common/components/standard-banner/standard-banner';
import {TwitchLogin} from '../../../common/components/twitch-login/twitch-login';
import {TwitchBotFaq} from "../twitch-bot-faq/twitch-bot-faq";
import {environment} from "../../../../environments/environment";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-twitch-bot-index',
  imports: [
    StandardBanner,
    TwitchLogin,
    TwitchBotFaq
  ],
  templateUrl: './twitch-bot-index.html',
  styleUrl: './twitch-bot-index.scss',
  standalone: true
})
export class TwitchBotIndex {
  protected readonly environment = environment;
  private metaService: Meta = inject(Meta);
  private titleService: Title = inject(Title);

  constructor() {
    this.metaService.updateTag({
      name: 'description',
      content: 'Login with your twitch account to get started with the nullinside bot!'
    });
    this.titleService.setTitle("nullinside Twitch Bot");
  }
}
