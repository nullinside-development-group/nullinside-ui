import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NullinsideService {

  constructor(private httpClient: HttpClient) {
  }

  validateToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/user/token/validate`, {token: token});
  }
}
