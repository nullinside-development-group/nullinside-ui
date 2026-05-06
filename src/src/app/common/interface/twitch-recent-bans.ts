export interface TwitchRecentBans {
  twitchUsername: string;
  timestamp: Date;
  chatLogs: TwitchChatLog[];
}

export interface TwitchChatLog {
  message: string;
  timestamp: Date;
  twitchId: string;
  twitchUsername: string;
}
