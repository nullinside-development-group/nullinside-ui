import {allEnvironments} from "./environments-all"

export const environment = {
  siteUrl: 'https://nullinside.com',
  apiUrl: 'https://nullinside.com/api/v1',
  nullApiUrl: 'https://nullinside.com/null/v1',
  twitchBotApiUrl: 'https://nullinside.com/twitch-bot/v1',
  twitchClientId: 'gi1eu8xu9tl6vkjqz4tjqkdzfmcq5h',
  encryptKey: 'prod-encrypt-key', // It's not meant to be secure, it's just meant to make it harder to figure out
  ...allEnvironments
};
