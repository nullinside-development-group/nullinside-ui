import {Component, inject, OnInit} from '@angular/core';
import {Logo} from '../logo/logo';
import {environment} from '../../../../environments/environment';
import {MatButton} from '@angular/material/button';
import {Auth} from "../../../service/auth";
import {Router} from '@angular/router';

@Component({
  selector: 'app-standard-banner',
  imports: [
    Logo,
    MatButton
  ],
  templateUrl: './standard-banner.html',
  styleUrl: './standard-banner.scss'
})
export class StandardBanner implements OnInit {
  private router = inject(Router);
  protected auth = inject(Auth);

  ngOnInit(): void {
    // We don't care about the result, we'll get the updated information from the signal auth.userIsLoggedIn regardless.
    this.auth.validateToken(this.auth.getToken() || '').subscribe({});
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

  onContactUs(): void {
    if (this.auth.userIsLoggedIn()) {
      this.router.navigate(['/contact-us']);
    } else {
      // Need to use window.location here instead of the router because otherwise the external javascript from Google
      // doesn't reload on the index page, and you can't retry your login until you refresh.
      window.location.href = `${environment.siteUrl}/user/auth?redirect=/contact-us`;
    }
  }
}
