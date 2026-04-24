import {CanActivateFn} from '@angular/router';
import {environment} from "../../environments/environment";
import {inject} from "@angular/core";
import {of, tap} from "rxjs";
import {Auth} from "../service/auth";

export const authGuard: CanActivateFn = (_, __) => {
  const token = inject(Auth).getToken();
  if (!token) {
    window.location.href = `${environment.siteUrl}`;
    return of(false);
  }

  return inject(Auth).validateToken().pipe(
    tap({
        next: tokenIsValid => {
          if (!tokenIsValid) {
            window.location.href = `${environment.siteUrl}`;
          }

          return tokenIsValid;
        },
        error: _ => {
          window.location.href = `${environment.siteUrl}`;
          return false;
        }
      }
    )
  );
};
