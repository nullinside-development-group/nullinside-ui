import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DockerResource} from '../common/interface/docker-resource';

@Injectable({
  providedIn: 'root',
})
export class Nullinside {
  private httpClient = inject(HttpClient);

  getVirtualMachines(): Observable<DockerResource[]> {
    return this.httpClient.get<DockerResource[]>(`${environment.apiUrl}/docker`);
  }

  setVirtualMachinePowerState(id: number, turnOn: boolean): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/docker/${id}`, {turnOn: turnOn});
  }
}
