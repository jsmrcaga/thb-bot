const http = require('http');
const fishingrod = require('fishingrod');

const server = http.createServer((req, res) => {
	res.end('OK');
});

const keep_alive = () => {
	const m20 = 1000 * 60 * 20;
	setInterval(() => {
		fishingrod.fish({
			host: 'https://discord-thb-bot.herokuapp.com/'
		}).then(() => {
			console.log('Kept alive');
		}).catch(e => {
			// wtf?
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
