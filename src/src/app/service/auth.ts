import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {OAuth} from "../common/interface/oauth";
import {environment} from "../../environments/environment";
import {UserRolesResponse} from "../common/interface/user-roles-response";
import {FeatureToggleResponse} from "../common/interface/feature-toggle-response";
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);
  private oauth: OAuth | null = null;
  private cookieService = inject(CookieService);
  public userIsLoggedIn: WritableSignal<boolean> = signal(false);

  constructor() {
    const rawCookie = this.cookieService.get('nullinside-token');
    if (rawCookie) {
      this.oauth = JSON.parse(rawCookie);
    }

    if (!this.oauth?.AccessToken) {
      this.oauth = null;
    }
  }

  setToken(token: OAuth): void {
    this.oauth = token;
    this.cookieService.set('nullinside-token', JSON.stringify(token), {
      expires: 365,
      path: '/',
      domain: 'nullinside.com',
      secure: true,
      sameSite: 'Strict'
    });
    this.userIsLoggedIn.set(true);
  }

  getToken(): string | null {
    return this.oauth?.AccessToken ?? null;
  }

  clearToken(): void {
    console.log('Clearing token');
    this.oauth = null;
    this.cookieService.delete('nullinside-token', '/', 'nullinside.com', true, 'Strict');
    this.userIsLoggedIn.set(false);
  }

  getOAuth(): OAuth | null {
    return this.oauth;
  }

  refreshToken(token: string): Observable<OAuth> {
    return this.httpClient.post<OAuth>(`${environment.apiUrl}/user/token/refresh`, {token: token}).pipe(
      tap({
        next: token => {
          this.setToken(token);
        },
        error: _ => {
          this.userIsLoggedIn.set(false);
        }
      })
    )
  }

  validateToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/user/token/validate`, {token: token}).pipe(
      tap({
        next: success => {
          this.userIsLoggedIn.set(success);
        },
        error: _ => {
          this.userIsLoggedIn.set(false);
        }
      })
    )
  }

  getUserRoles(): Observable<UserRolesResponse> {
    return this.httpClient.get<UserRolesResponse>(`${environment.apiUrl}/user/roles`);
  }

  getFeatureToggles(): Observable<FeatureToggleResponse[]> {
    return this.httpClient.get<FeatureToggleResponse[]>(`${environment.apiUrl}/featureToggle`);
  }
}
