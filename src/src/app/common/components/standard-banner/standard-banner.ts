import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Logo} from '../logo/logo';
import {environment} from '../../../../environments/environment';
import {MatButton} from '@angular/material/button';
import {Auth} from "../../../service/auth";

@Component({
  selector: 'app-standard-banner',
  imports: [
    Logo,
    MatButton
  ],
  templateUrl: './standard-banner.html',
  styleUrl: './standard-banner.scss',
  standalone: true
})
export class StandardBanner implements OnInit {
  private auth = inject(Auth);
  public userIsLoggedIn: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.userIsLoggedIn.set(null !== this.auth.getToken());
  }

  onLogout(): void {
    this.auth.clearToken();

    // Need to use window.location here instead of the router because if you're already on the home page and you
    // router.navigate to it, it doesn't refresh the page and update the state.
    window.location.href = `${environment.siteUrl}`;
  }

  onLogin() {
    // Need to use window.location here instead of the router because otherwise the external javascript from Google
    // doesn't reload on the index page, and you can't retry your login until you refresh.
    window.location.href = `${environment.siteUrl}/user/auth`;
  }
}
