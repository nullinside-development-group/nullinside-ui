import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TwitchBotIsModResponse} from "../common/interface/twitch-bot-is-mod-response";
import {TwitchBotConfig} from "../common/interface/twitch-bot-config";

@Injectable({
  providedIn: 'root'
})
export class NullinsideTwitchBotService {
  private httpClient = inject(HttpClient);


  getIsMod(): Observable<TwitchBotIsModResponse> {
    return this.httpClient.get<TwitchBotIsModResponse>(`${environment.twitchBotApiUrl}/bot/mod`);
  }

  modBot(): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.twitchBotApiUrl}/bot/mod`, {});
  }

  getConfig(): Observable<TwitchBotConfig> {
    return this.httpClient.get<TwitchBotConfig>(`${environment.twitchBotApiUrl}/bot/config`);
  }

  setConfig(config: TwitchBotConfig): Observable<TwitchBotConfig> {
    return this.httpClient.post<TwitchBotConfig>(`${environment.twitchBotApiUrl}/bot/config`, config);
  }
}
