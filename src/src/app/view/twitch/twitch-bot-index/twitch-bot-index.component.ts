import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {LogoComponent} from '../../../common/components/logo/logo.component';
import {MatButton} from '@angular/material/button';
import {StandardBannerComponent} from '../../../common/components/standard-banner/standard-banner.component';
import {TwitchLoginComponent} from '../../../common/components/twitch-login/twitch-login.component';
import {TwitchBotFaqComponent} from "../twitch-bot-faq/twitch-bot-faq.component";

@Component({
  selector: 'app-twitch-bot-index',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LogoComponent,
    MatButton,
    StandardBannerComponent,
    TwitchLoginComponent,
    TwitchBotFaqComponent
  ],
  templateUrl: './twitch-bot-index.component.html',
  styleUrl: './twitch-bot-index.component.scss'
})
export class TwitchBotIndexComponent {
}
