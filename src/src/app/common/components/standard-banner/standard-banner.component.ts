import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { environment } from '../../../../environments/environment';
import { MatButton } from '@angular/material/button';

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
  public userIsLoggedIn: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.userIsLoggedIn = null !== localStorage.getItem('auth-token');
  }

  onLogout(): void {
    localStorage.removeItem('auth-token');

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
