# Discord Bot TS

<p align="center">
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Development-In%20Progress-yellow?style=for-the-badge">
</p>

A simple Discord bot built with **Discord.js** and **TypeScript**. This bot is currently under development, and new features are coming soon. Stay tuned!

## Features

- **Ping Command**: Responds with "Pong!".
- **Hello Command**: Responds with a greeting message.
- **Weather Command**: Fetches and displays the weather for a specified city.
- **Exchange Rate Command**: Fetches and displays the exchange rate between two currencies.
- **Echo Command**: Repeats the message provided by the user.

## Technologies Used

- **Discord.js**: Powerful library for interacting with the Discord API.
- **TypeScript**: Strongly typed programming language for building robust applications.

## How to Run Locally

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MatheusCampagnolo/discord-bot-ts.git
   cd discord-bot-ts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add your Discord bot token and client ID, make sure to also add the API's token:
   ```env
   DISCORD_TOKEN=your-discord-token
   CLIENT_ID=your-client-id
   GUILD_ID=your-guild-id
   EXCHANGE_RATE_API_KEY=your-exchange-rate-api-token
   ```

4. **Deploy commands**:
   ```bash
   npm run deploy-commands
   ```

5. **Run the bot**:
   ```bash
   npm start
   ```

   The bot should be running and connected to your Discord server.

## Project Structure

```
/src
  ├── /commands             # Command files
  ├── /utils                # Utility functions
  ├── index.ts              # Main entry file for the bot
  ├── deploy-commands.ts    # Script to deploy slash commands
.env                        # Environment variables
.gitignore                  # Git ignore file to exclude unnecessary files
package.json                # Project configuration and dependencies
tsconfig.json               # TypeScript configuration file
README.md                   # This README file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Status
This bot is currently under development. New features and improvements are being added regularly. Stay tuned for updates!
