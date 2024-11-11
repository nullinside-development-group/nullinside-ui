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
      'moderator:manage:banned_users', // Allow you to ban in your chat and those you moderate
      'channel:manage:moderators', // Allows us to make the bot account a moderator for them
      'moderation:read', // Allows us to check who is a moderator
      'user:read:moderated_channels', // Allows the bot to check what channels it moderates. Doesn't hurt to have this from the user.
      'chat:read', // Allows bot to connect to chat channel and receive messages
      'chat:edit', // Allows bot to connect to chat channel and send messages
      'channel:moderate', // Allows bot to connect to chat channel and perform moderator functions
      'channel:bot', // Allows bot to connect to chat channel and perform bot actions
      'user:bot', // Allows bot to connect to chat channel and perform bot actions
      'channel:read:subscriptions' // Allows us to use webhooks to read chat
    ]
  ]
}
