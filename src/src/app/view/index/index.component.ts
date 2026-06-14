import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {TwitchStreamCarousel} from '../twitch/components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../common/interface/twitch-live-bot-users';
import {App} from '../../service/app';
import {NullinsideTwitchBot} from '../../service/nullinside-twitch-bot';

@Component({
  selector: 'app-home',
  imports: [
    LoadingIcon,
    TwitchStreamCarousel
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  standalone: true
})
export class Index implements OnInit {
  private api = inject(NullinsideTwitchBot);
  private router = inject(Router);
  protected appService = inject(App);

  public carouselEnabled = signal(false);
  protected liveStreams: WritableSignal<TwitchLiveBotUsers[]> = signal([]);

  ngOnInit(): void {
    this.api.getAllLiveTwitchBotUsers().subscribe(response => this.liveStreams.set(response));
  }

  onAppClicked(displayName: string) {
    const existing = this.appService.apps().find(a => a.displayName === displayName);
    if (!existing) {
      return;
    }

    this.router.navigate([existing.url]);
  }
}
