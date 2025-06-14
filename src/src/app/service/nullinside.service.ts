import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserRolesResponse} from "../common/interface/user-roles-response";
import {DockerResource} from '../common/interface/docker-resource';
import {FeatureToggleResponse} from "../common/interface/feature-toggle-response";

@Injectable({
  providedIn: 'root'
})
export class NullinsideService {
  private httpClient = inject(HttpClient);


  validateToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/user/token/validate`, {token: token});
  }

  getUserRoles(): Observable<UserRolesResponse> {
    return this.httpClient.get<UserRolesResponse>(`${environment.apiUrl}/user/roles`);
  }

  getVirtualMachines(): Observable<DockerResource[]> {
    return this.httpClient.get<DockerResource[]>(`${environment.apiUrl}/docker`);
  }

  setVirtualMachinePowerState(id: number, turnOn: boolean): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/docker/${id}`, {turnOn: turnOn});
  }

  getFeatureToggles(): Observable<FeatureToggleResponse[]> {
    return this.httpClient.get<FeatureToggleResponse[]>(`${environment.apiUrl}/featureToggle`);
  }
}
