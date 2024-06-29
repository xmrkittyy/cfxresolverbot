# FiveM Cfx Resolver Discord Bot

## Overview
This Discord bot resolves FiveM server information using the `cfx.re/join` links. It retrieves server details such as hostname, owner, IP address, port, and current player count from the FiveM API and displays them in a formatted message using Discord's MessageEmbed.

## Prerequisites
- Node.js installed on your machine ([Node.js Installation](https://nodejs.org/))
- Discord Bot Token (Create a bot and get token from [Discord Developer Portal](https://discord.com/developers/applications))

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/xmrkittyy/cfxresolverbot.git
   cd cfxresolverbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Discord bot token:
   Open `bot.js` file.
   Replace `YOUR_DISCORD_BOT_TOKEN_HERE` with your actual Discord bot token:
   ```
   client.login('YOUR_DISCORD_BOT_TOKEN_HERE');
   ```

## Usage
1. Start the bot:
   ```bash
   node bot.js
   ```
   This command will start the bot and log it in to Discord.

2. Use the bot in your Discord server:
   - Invite the bot to your server using the OAuth2 URL generated from the Discord Developer Portal.
   - Prefix all commands with `!` (e.g., `!resolve cfx.re/join/server-code`).

## Commands
- `!resolve cfx.re/join/server-code`: Resolves the FiveM server information based on the provided `cfx.re/join` link.
- `!ping`: Responds with 'Pong!' to check if the bot is online.

## Additional Notes
- The bot uses `node-fetch` to make HTTP requests to the FiveM API.
- Ensure that the bot has permission to read and send messages in the channels where it operates.
