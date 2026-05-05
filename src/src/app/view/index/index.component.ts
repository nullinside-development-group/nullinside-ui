import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {Auth} from "../../service/auth";
import {TwitchStreamCarousel} from '../../common/components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../common/interface/twitch-live-bot-users';
import {Nullinside} from '../../service/nullinside';
import {App} from '../../service/app';

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
  private api = inject(Nullinside);
  private auth = inject(Auth);
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
