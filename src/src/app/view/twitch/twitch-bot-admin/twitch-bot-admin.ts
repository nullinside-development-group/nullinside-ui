import {Component, signal} from '@angular/core';
import {AutoScrollingChat} from '../components/auto-scrolling-chat/auto-scrolling-chat';
import {TimeSinceCountdown} from '../components/time-since-countdown/time-since-countdown';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-twitch-bot-admin',
  imports: [
    AutoScrollingChat,
    TimeSinceCountdown,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './twitch-bot-admin.html',
  styleUrl: './twitch-bot-admin.scss',
})
export class TwitchBotAdmin {
  protected filteredChannel = signal<string | null>(null);
}
