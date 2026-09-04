export interface TwitchChatMessage {
  id: number;
  channel: string | null;
  sender: string;
  message: string;
  timestamp: Date;
}
