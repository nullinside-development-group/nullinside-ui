import {CanActivateFn} from '@angular/router';
import {environment} from "../../environments/environment";
import {inject} from "@angular/core";
import {of, tap} from "rxjs";
import {Auth} from "../service/auth";

export const authGuard: CanActivateFn = (_, __) => {
  // TODO: Hook up the "returnUrl" in the rest of the application. GitHub issue #
  const token = inject(Auth).getToken();
  if (!token) {
    window.location.href = `${environment.siteUrl}`;
    return of(false);
  }

  return inject(Auth).validateToken(token).pipe(
    tap({
        next: success => {
          if (!success) {
            window.location.href = `${environment.siteUrl}`;
          }

          return success;
        },
        error: _ => {
          window.location.href = `${environment.siteUrl}`;
          return false;
        }
      }
    )
  );
};
