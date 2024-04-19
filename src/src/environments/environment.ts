export const environment = {
  siteUrl: 'https://nullinside.com',
  apiUrl: 'https://nullinside.com/api/v1',
  nullApiUrl: 'https://nullinside.com/null/v1',
  twitchClientId: 'gi1eu8xu9tl6vkjqz4tjqkdzfmcq5h',
  twitchScopes: [
    // Default get email only! Used for login instead of Gmail.
    [
      'user:read:email'
    ],
    // "Twitch Bot" permissions.
    [
      'user:read:email',
      'moderator:read:chatters'
    ],
  ]
};
