import {Component} from '@angular/core';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';
import {TimeSinceCountdown} from '../components/time-since-countdown/time-since-countdown';

@Component({
  selector: 'app-twitch-bot-admin',
  imports: [
    AutoScrollingChat,
    TimeSinceCountdown
  ],
  templateUrl: './twitch-bot-admin.html',
  styleUrl: './twitch-bot-admin.scss',
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TwitchBotAdmin {

}
