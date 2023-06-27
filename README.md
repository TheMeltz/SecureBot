# SecureBot

SecureBot is a Discord bot designed to provide the functionality of banning Roblox players from a game directly within the Discord platform.

## Features

- Easy banning of Roblox players from Discord.
- Seamless integration with the Roblox game for efficient moderation.

## Requirements

To run SecureBot, make sure you have the following:

- Node.js v18.2.1+ (Not tested with any version below this)

## Installation

Follow these steps to install and set up SecureBot:

1. Clone the SecureBot repository to your local machine.
2. Install the required dependencies by running the following command: `npm install`
3. Configure the bot by creating a `.env` file and providing the necessary details (e.g., Discord bot token, Roblox game ID, etc.).
4. Start the bot by running the following command: `node .`

## Usage

Once the bot is up and running, you can use the following command to ban a Roblox player:
`/ban (identifier) <reason> <duration>`

- `(identifier)`: The identifier of the player to be banned (e.g., Roblox username, user ID).
- `<reason>` (optional): The reason for the ban.
- `<duration>` (optional): The duration of the ban.

The opposite is also valid, use `/unban` to unban a player!

## Example

To ban a player with the username "examplePlayer" for 7 days with the reason "Inappropriate behavior," use the following command:

`/ban examplePlayer Inappropriate behavior 7d`


## Contributing

Contributions are welcome! If you would like to contribute to SecureBot, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request detailing your changes.

## License

SecureBot is released under the [MIT License](LICENSE).

## Authors

- [@TheMeltz](https://www.github.com/TheMeltz)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DISCORD_CLIENT_TOKEN`
- `ROBLOX_API_KEY`
