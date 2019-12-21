const discord = require('@jsmrcaga/discord');

const Commands = require('./commands/commands');
const Sentry = require('./lib/sentry');

const bot = new discord({
	identify: {
		token: process.env.DISCORD_BOT_TOKEN
	}
});

// Handle MMR for rocket league, check channel and user
bot.command('/mmr', ({ args: { variables, options } , data }) => { Commands.mmr() });

bot.on('message', ({ content, channel, channel_id }) => {
	if(content.indexOf('help') > -1) {
		if(!channel || !channel.is_dm) {
			return;
		}
		return bot.message({
			channel: channel ? channel.id : channel_id,
			content:
`
If you want to know your Rocket League MMR please send me a dm like so:
\`\`\`
/mmr your_tracker_id
\`\`\`
You can find your tracker id by going to Tracker Network (https://rocketleague.tracker.network/) and choosing "Live Tracker". Then you should see your id on the url ;) 
`
		});
	}
});

bot.connect();

process.on('uncaughtException', (e) => {
	Sentry.captureException(err);
});

process.on('unhandledRejection', (e) => {
	Sentry.captureException(err);
});
