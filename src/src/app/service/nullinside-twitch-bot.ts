import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TwitchBotIsModResponse} from '../common/interface/twitch-bot-is-mod-response';
import {TwitchBotConfig} from '../common/interface/twitch-bot-config';
import {TwitchLiveBotUsers} from '../common/interface/twitch-live-bot-users';
import {TwitchRecentBans} from '../common/interface/twitch-recent-bans';
import {PaginatedTwitchChatLog} from '../common/interface/twitch-chat-log';
import {TimeSinceChat} from '../common/interface/time-since-chat';

@Injectable({
  providedIn: 'root',
})
export class NullinsideTwitchBot {
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

  getAllLiveTwitchBotUsers(): Observable<TwitchLiveBotUsers[]> {
    return this.httpClient.get<TwitchLiveBotUsers[]>(`${environment.twitchBotApiUrl}/bot/live`).pipe(
      map(users => users.map(user => ({
        ...user,
        goneLiveTime: new Date(`${user.goneLiveTime.toString()}Z`)
      })))
    );
  }

  getRecentBotBans(): Observable<TwitchRecentBans[]> {
    return this.httpClient.get<TwitchRecentBans[]>(`${environment.twitchBotApiUrl}/bot/bans`).pipe(
      map(bans => bans.map(ban => ({
        ...ban,
        timestamp: new Date(`${ban.timestamp.toString()}Z`),
        chatLogs: ban.chatLogs.map(log => ({
          ...log,
          timestamp: new Date(`${log.timestamp.toString()}Z`)
        }))
      })))
    );
  }

  getAllChatMessages(): Observable<PaginatedTwitchChatLog> {
    return this.httpClient.get<PaginatedTwitchChatLog>(`${environment.twitchBotApiUrl}/bot/chat/admin`).pipe(
      map(response => {
        return {
          ...response,
          data: response.data.map(message => ({
            ...message,
            timestamp: new Date(`${message.timestamp.toString()}Z`)
          }))
        };
      })
    );
  }

  getTimeSinceMessageForAllTwitchChannels(): Observable<TimeSinceChat[]> {
    return this.httpClient.get<TimeSinceChat[]>(`${environment.twitchBotApiUrl}/bot/chat/timeSince`).pipe(
      map(response => response.map(timeSince => ({
        ...timeSince,
        latestMessage: new Date(`${timeSince.latestMessage.toString()}Z`)
      })))
    );
  }
}
