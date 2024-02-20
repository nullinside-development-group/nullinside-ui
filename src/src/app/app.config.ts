import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BearerTokenInterceptor } from "./middleware/bearer-token-interceptor";

export const noopInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    noopInterceptorProvider,
  ]
};
