import {Component, inject, OnInit} from '@angular/core';
import {LogoComponent} from '../logo/logo.component';
import {environment} from '../../../../environments/environment';
import {MatButton} from '@angular/material/button';
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-standard-banner',
  imports: [
    LogoComponent,
    MatButton
  ],
  templateUrl: './standard-banner.component.html',
  styleUrl: './standard-banner.component.scss'
})
export class StandardBannerComponent implements OnInit {
  private auth = inject(AuthService);
  public userIsLoggedIn: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.userIsLoggedIn = null !== this.auth.getToken();
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
