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
import {TwitchChatBanOutsideOfBot} from '../common/interface/twitch-chat-ban-outside-of-bot';

@Injectable({
  providedIn: 'root',
})
export class NullinsideTwitchBot {
  private httpClient = inject(HttpClient);

  getBotIsMod(): Observable<TwitchBotIsModResponse> {
    return this.httpClient.get<TwitchBotIsModResponse>(`${environment.twitchBotApiUrl}/moderators/bot`);
  }

  modBot(): Observable<unknown> {
    return this.httpClient.put<unknown>(`${environment.twitchBotApiUrl}/moderators/bot`, {});
  }

  getConfig(): Observable<TwitchBotConfig> {
    return this.httpClient.get<TwitchBotConfig>(`${environment.twitchBotApiUrl}/configurations/me`);
  }

  setConfig(config: TwitchBotConfig): Observable<TwitchBotConfig> {
    return this.httpClient.put<TwitchBotConfig>(`${environment.twitchBotApiUrl}/configurations/me`, config);
  }

  getAllLiveTwitchBotUsers(): Observable<TwitchLiveBotUsers[]> {
    return this.httpClient.get<TwitchLiveBotUsers[]>(`${environment.twitchBotApiUrl}/streams`).pipe(
      map(users => users.map(user => ({
        ...user,
        goneLiveTime: new Date(`${user.goneLiveTime.toString()}Z`)
      })))
    );
  }

  getRecentBotBans(): Observable<TwitchRecentBans[]> {
    return this.httpClient.get<TwitchRecentBans[]>(`${environment.twitchBotApiUrl}/bans`).pipe(
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

  getAllChatMessages(channel: string | null = null): Observable<PaginatedTwitchChatLog> {
    return this.httpClient.get<PaginatedTwitchChatLog>(`${environment.twitchBotApiUrl}/chats${!channel ? '' : '?channel=' + channel}`).pipe(
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

  getBansNotFromBot(): Observable<TwitchChatBanOutsideOfBot[]> {
    return this.httpClient.get<TwitchChatBanOutsideOfBot[]>(`${environment.twitchBotApiUrl}/bans/external`).pipe(
      map(response => response.map(message => ({
        ...message,
        timestamp: new Date(`${message.timestamp.toString()}Z`)
      })))
    );
  }

  getTimeSinceMessageForAllTwitchChannels(): Observable<TimeSinceChat[]> {
    return this.httpClient.get<TimeSinceChat[]>(`${environment.twitchBotApiUrl}/chats/activity`).pipe(
      map(response => response.map(timeSince => ({
        ...timeSince,
        latestMessage: new Date(`${timeSince.latestMessage.toString()}Z`)
      })))
    );
  }
}
