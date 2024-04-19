import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-twitch-login',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './twitch-login.component.html',
  styleUrl: './twitch-login.component.scss'
})
export class TwitchLoginComponent {
  /**
   * 0 = Home page
   * 1 = Twitch Bot Login
   */
  @Input() twitchScopeIndex: number = 0;

  twitchLogin(): void {
    const redirectUrl = `${environment.apiUrl}/user/twitch-login`;
    window.location.href = `https://id.twitch.tv/oauth2/authorize?` +
      encodeURI(`client_id=${environment.twitchClientId}&` +
        `redirect_uri=${redirectUrl}&` +
        `response_type=code&` +
        `scope=${environment.twitchScopes[this.twitchScopeIndex].join(' ')}`);
  }
}
