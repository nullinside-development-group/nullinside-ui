export interface TwitchChatLog {
  id: number;
  channel: string | null;
  twitchId: string | null;
  twitchUsername: string | null;
  message: string | null;
  timestamp: Date;
}

export interface PaginatedTwitchChatLog {
  data: TwitchChatLog[]
  totalCount: number
  page: number
  pageSize: number
}
