const Sentry = require('./lib/sentry');
const Heroku = require('./lib/heroku');

// Launch commands
const Commands = require('./commands/commands');
Commands.register();

const bot = require('./lib/bot');

// Help handler
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

// Start the bot
bot.connect();

// Set error handlers to send errors to sentry and prevent crashes
bot.on('error', (e) => {
	// TODO: find a way to pass params to configure sentry scope
	Sentry.captureException(e);
});

// PM should be able to restart process without a problem
process.on('uncaughtException', (e) => {
	Sentry.captureException(e);
	process.exit(1);
});

process.on('unhandledRejection', (e) => {
	Sentry.captureException(e);
	process.exit(1);
});

// Heroku listener
const port = process.env.PORT || 1234;
Heroku.listen({ port }, () => {
	console.log(`Heroku server listening on port ${port}`);
});
