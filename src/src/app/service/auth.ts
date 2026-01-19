import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

  constructor() {
    const rawCookie = this.cookieService.get('token');
    if (rawCookie) {
      this.oauth = JSON.parse(rawCookie);
    }

    if (!this.oauth?.AccessToken) {
      this.oauth = null;
    }
  }

  setToken(token: OAuth): void {
    this.oauth = token;

    this.cookieService.set('token', JSON.stringify(token), {secure: true, sameSite: 'Strict'});
  }

  getToken(): string | null {
    return this.oauth?.AccessToken ?? null;
  }

  clearToken(): void {
    this.oauth = null;
    this.cookieService.delete('token');
  }

  getOAuth(): OAuth | null {
    return this.oauth;
  }

  refreshToken(token: string): Observable<OAuth> {
    return this.httpClient.post<OAuth>(`${environment.apiUrl}/user/token/refresh`, {token: token});
  }

  validateToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/user/token/validate`, {token: token});
  }

  getUserRoles(): Observable<UserRolesResponse> {
    return this.httpClient.get<UserRolesResponse>(`${environment.apiUrl}/user/roles`);
  }

  getFeatureToggles(): Observable<FeatureToggleResponse[]> {
    return this.httpClient.get<FeatureToggleResponse[]>(`${environment.apiUrl}/featureToggle`);
  }
}
