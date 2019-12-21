const discord = require('@jsmrcaga/discord');

const bot = new discord({
	identify: {
		token: process.env.DISCORD_BOT_TOKEN
	}
});

module.exports = bot;
