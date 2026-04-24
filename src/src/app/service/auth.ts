import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize, Observable, of, share, switchMap, tap} from "rxjs";
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
  private refreshTokenObservable: Observable<OAuth> | null = null;
  public userIsLoggedIn: WritableSignal<boolean> = signal(false);

  constructor() {
    const rawCookie = this.cookieService.get('nullinside-token');
    if (rawCookie) {
      this.oauth = JSON.parse(rawCookie);
    }

    if (!this.oauth?.accessToken) {
      this.oauth = null;
    } else {
      this.userIsLoggedIn.set(true);
    }
  }

  setToken(token: OAuth): void {
    this.oauth = token;
    this.cookieService.set('nullinside-token', JSON.stringify(token), {
      expires: 7,
      path: '/',
      domain: environment.domain,
      secure: true,
      sameSite: 'Strict'
    });
    this.userIsLoggedIn.set(true);
  }

  getToken(): string | null {
    return this.oauth?.accessToken ?? null;
  }

  clearToken(): void {
    this.oauth = null;
    this.cookieService.delete('nullinside-token', '/', environment.domain, true, 'Strict');
    this.userIsLoggedIn.set(false);
  }

  getOAuth(): OAuth | null {
    return this.oauth;
  }

  refreshToken(token: string): Observable<OAuth> {
    if (this.refreshTokenObservable) {
      return this.refreshTokenObservable;
    }

    this.refreshTokenObservable = this.httpClient.post<OAuth>(`${environment.apiUrl}/user/token/refresh`, {token: token}).pipe(
      tap({
        next: token => {
          this.setToken(token);
        },
        error: _ => {
          this.clearToken();
        }
      }),
      share(),
      finalize(() => {
        this.refreshTokenObservable = null;
      })
    );

    return this.refreshTokenObservable;
  }

  validateToken(token?: string): Observable<boolean> {
    return of(null).pipe(
      switchMap(() => {
        const tokenToValidate = token ?? this.getToken();
        if (!tokenToValidate) {
          this.userIsLoggedIn.set(false);
          return of(false);
        }

        return this.httpClient.post<boolean>(`${environment.apiUrl}/user/token/validate`, {token: tokenToValidate}).pipe(
          tap({
            next: success => {
              this.userIsLoggedIn.set(success);
            },
            error: _ => {
              this.userIsLoggedIn.set(false);
            }
          })
        );
      })
    );
  }

  getUserRoles(): Observable<UserRolesResponse> {
    return this.httpClient.get<UserRolesResponse>(`${environment.apiUrl}/user/roles`);
  }

  getFeatureToggles(): Observable<FeatureToggleResponse[]> {
    return this.httpClient.get<FeatureToggleResponse[]>(`${environment.apiUrl}/featureToggle`);
  }
}
