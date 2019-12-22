const Sentry = require('./sentry');
const http = require('http');
const fishingrod = require('fishingrod');

const server = http.createServer((req, res) => {
	res.end('OK');
});

const keep_alive = () => {
	const m20 = 1000 * 60 * 5; // 5 minutes
	setInterval(() => {
		fishingrod.fish({
			host: 'discord-thb-bot.herokuapp.com',
			method: 'GET'
		}).then(({ response }) => {
			console.log('Kept alive', response);
		}).catch(e => {
			// wtf?
			console.error('[KeepAlive]', e);
			Sentry.captureException(e);
		});
	}, m20);
};

module.exports = {
	listen: (options, cb=()=>{}) => {
		console.log('[Heroku] Launching server');
		return server.listen(options, () => {
			console.log('[Heroku] Server alive, launching scheduler');
			keep_alive();
			cb();
		});
	}
};
