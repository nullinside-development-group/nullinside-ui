import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OAuth} from "../common/interface/oauth";
import {environment} from "../../environments/environment";
import {UserRolesResponse} from "../common/interface/user-roles-response";
import {FeatureToggleResponse} from "../common/interface/feature-toggle-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private oauth: OAuth | null = null;

  constructor() {
    this.oauth = {
      AccessToken: localStorage.getItem('auth-AccessToken') ?? '',
      RefreshToken: localStorage.getItem('auth-RefreshToken') ?? '',
      ExpiresUtc: localStorage.getItem('auth-ExpiresUtc') ?? ''
    };

    if (!this.oauth.AccessToken) {
      this.oauth = null;
    }
  }

  setToken(token: OAuth): void {
    this.oauth = token;
    localStorage.setItem('auth-AccessToken', token.AccessToken);
    localStorage.setItem('auth-RefreshToken', token.RefreshToken);
    localStorage.setItem('auth-ExpiresUtc', token.ExpiresUtc);
  }

  getToken(): string | null {
    return this.oauth?.AccessToken ?? null;
  }

  clearToken(): void {
    this.oauth = null;
    localStorage.removeItem('auth-AccessToken');
    localStorage.removeItem('auth-RefreshToken');
    localStorage.removeItem('auth-ExpiresUtc');
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
