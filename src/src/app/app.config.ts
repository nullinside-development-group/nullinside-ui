import {ApplicationConfig, provideBrowserGlobalErrorListeners, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {bearerTokenInterceptor} from './middleware/bearer-token-interceptor';

export const materialSnackbarDefaults: Provider =
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5 * 1000}};
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([bearerTokenInterceptor])),
    materialSnackbarDefaults
  ]
};
