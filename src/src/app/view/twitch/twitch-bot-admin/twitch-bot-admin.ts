import {Component} from '@angular/core';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';

@Component({
  selector: 'app-twitch-bot-admin',
  imports: [
    AutoScrollingChat
  ],
  templateUrl: './twitch-bot-admin.html',
  styleUrl: './twitch-bot-admin.scss',
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TwitchBotAdmin {

}
