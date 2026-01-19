import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Auth} from "../service/auth";

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = req.url.toLowerCase().replace('https://www.', 'https://');
  const authService: Auth = inject(Auth);

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
    return next(req);
  }

  const oAuth = authService.getOAuth();
  if (!oAuth) {
    return next(req);
  }

  if (new Date(oAuth.ExpiresUtc) < new Date()) {
    authService.clearToken();
    authService.refreshToken(oAuth.RefreshToken).subscribe({
      next: oAuth => {
        authService.setToken(oAuth);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  req = req.clone({
    setHeaders: {Authorization: `Bearer ${authService.getToken()}`}
  });

  return next(req);
}
