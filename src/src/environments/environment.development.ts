import {allEnvironments} from "./environments-all";

export const environment = {
  siteUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:5036/api/v1',
  nullApiUrl: 'http://localhost:5219/null/v1',
  twitchBotApiUrl: 'http://localhost:5941/twitch-bot/v1',
  twitchClientId: 'cvipqhi9y6ri8yhv0w8ryxokxh0ebd',
  ...allEnvironments
};
