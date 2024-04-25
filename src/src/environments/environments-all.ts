export const allEnvironments = {
  twitchScopes: [
    // Default get email only! Used for login instead of Gmail.
    [
      'user:read:email'
    ],
    // "Twitch Bot" permissions.
    [
      'user:read:email',
      'moderator:read:chatters'
    ]
  ]
}
