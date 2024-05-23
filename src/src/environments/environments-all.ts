export const allEnvironments = {
  twitchScopes: [
    // Default get email only! Used for login instead of Gmail.
    [
      'user:read:email'
    ],
    // "Twitch Bot" permissions.
    [
      'user:read:email', // Get their email address (they have to have one associated to the account)
      'moderator:read:chatters', // Reads your chat and the chats of those you moderate
      'moderator:manage:banned_users' // Allow you to ban in your chat and those you moderate
    ]
  ]
}
