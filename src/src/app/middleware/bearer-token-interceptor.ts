import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';

import {environment} from "../../environments/environment";
import {Auth} from "../service/auth";
import {of, switchMap} from "rxjs";

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
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

  const refreshOAuthTokenIfExpired = (new Date(oAuth.expiresUtc) < new Date())
    ? authService.refreshToken(oAuth.refreshToken)
    : of(oAuth);

  return refreshOAuthTokenIfExpired.pipe(
    switchMap(token => {
      const request = req.clone({
        setHeaders: {Authorization: `Bearer ${token.accessToken}`}
      });

      // If we are validating the token, we should also update the token in the body if it matches the old one.
      // This is because the validate endpoint takes the token in the body as well and if we just
      // refreshed it, the body would still have the old one.
      if (request.url.toLowerCase().endsWith('/user/token/validate')) {
        const body = request.body as { token?: string };
        if (body.token === oAuth.accessToken) {
          return next(request.clone({
            body: {...body, token: token.accessToken}
          }));
        }
      }

      return next(request);
    })
  );
}
