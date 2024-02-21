import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase().replace('https://www.', 'https://');
    if (!url.startsWith(`${environment.apiUrl}/`)) {
      return next.handle(req);
    }

    const token = localStorage.getItem('auth-token');
    if (!token) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });

    return next.handle(req);
  }
}
