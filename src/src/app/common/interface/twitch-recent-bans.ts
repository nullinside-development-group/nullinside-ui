export interface TwitchRecentBans {
  twitchUsername: string;
  timestamp: Date;
  chatLogs: TwitchRecentBanChatLog[];
}

export interface TwitchRecentBanChatLog {
  message: string;
  timestamp: Date;
  twitchId: string;
  twitchUsername: string;
}
