import {ApplicationConfig, provideBrowserGlobalErrorListeners, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {bearerTokenInterceptor} from "./middleware/bearer-token-interceptor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";

export const noopInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useFactory: bearerTokenInterceptor, multi: true};

export const materialSnackbarDefaults: Provider =
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5 * 1000}};
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    noopInterceptorProvider,
    materialSnackbarDefaults
  ]
};
