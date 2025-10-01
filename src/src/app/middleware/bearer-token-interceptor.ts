import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "../service/auth.service";

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase().replace('https://www.', 'https://');

    if (
      // Prevent infinite loop
      url.endsWith(`/user/token/refresh`) ||
      (
        // Our services, no need to send our bearer tokens to other apis
        !url.startsWith(`${environment.apiUrl}/`) &&
        !url.startsWith(`${environment.nullApiUrl}/`) &&
        !url.startsWith(`${environment.twitchBotApiUrl}/`)
      )
    ) {
      return next.handle(req);
    }

    const oAuth = inject(AuthService).getOAuth();
    if (!oAuth) {
      return next.handle(req);
    }

    if (new Date(oAuth.ExpiresUtc) < new Date()) {
      inject(AuthService).clearToken();
      inject(AuthService).refreshToken(oAuth.RefreshToken).subscribe({
        next: oAuth => {
          inject(AuthService).setToken(oAuth);
        },
        error: err => {
          console.error(err);
        }
      });
    }

    req = req.clone({
      setHeaders: {Authorization: `Bearer ${inject(AuthService).getToken()}`}
    });

    return next.handle(req);
  }
}
