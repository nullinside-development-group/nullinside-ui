import { CanActivateFn } from '@angular/router';
import { environment } from "../../environments/environment";
import { inject } from "@angular/core";
import { NullinsideService } from "../service/nullinside.service";
import { of, tap } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  // TODO: Hook up the "returnUrl" in the rest of the application. GitHub issue #
  const token = localStorage.getItem('auth-token');
  if (!token) {
    // Need to use window.location here instead of the router because otherwise the external javascript from Google
    // doesn't reload on the index page, and you can't retry your login until you refresh.
    //
    // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
    // issues that have changed over time the linting complains about it.
    window.location = `${environment.siteUrl}?returnUrl=${encodeURI(state.url)}`;
    return of(false);
  }

  return inject(NullinsideService).validateToken(token).pipe(
    tap({
        next: success => {
          if (!success) {
            // Need to use window.location here instead of the router because otherwise the external javascript from Google
            // doesn't reload on the index page, and you can't retry your login until you refresh.
            //
            // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
            // issues that have changed over time the linting complains about it.
            window.location = `${environment.siteUrl}?returnUrl=${encodeURI(state.url)}`;
          }

          return success;
        },
        error: _ => {
          // Need to use window.location here instead of the router because otherwise the external javascript from Google
          // doesn't reload on the index page, and you can't retry your login until you refresh.
          //
          // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
          // issues that have changed over time the linting complains about it.
          window.location = `${environment.siteUrl}?returnUrl=${encodeURI(state.url)}`;
          return false;
        }
      }
    )
  );
};
