import {Component} from '@angular/core';
import {StandardBannerComponent} from '../../../common/components/standard-banner/standard-banner.component';
import {TwitchLoginComponent} from '../../../common/components/twitch-login/twitch-login.component';
import {TwitchBotFaqComponent} from "../twitch-bot-faq/twitch-bot-faq.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-twitch-bot-index',
  imports: [
    StandardBannerComponent,
    TwitchLoginComponent,
    TwitchBotFaqComponent
  ],
  templateUrl: './twitch-bot-index.component.html',
  styleUrl: './twitch-bot-index.component.scss'
})
export class TwitchBotIndexComponent {
  protected readonly environment = environment;
}
