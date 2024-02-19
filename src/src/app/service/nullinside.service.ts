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

  googleLogin(clientId: string, credential: string): Observable<string> {
    const body = {clientId: clientId, credential: credential};
    return this.httpClient.post<string>(`${environment.apiUrl}/user/login`, body);
  }
}
