export const environment = {
  siteUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:5036/api/v1',
  twitchClientId: 'cvipqhi9y6ri8yhv0w8ryxokxh0ebd',
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
