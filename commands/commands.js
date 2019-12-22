const bot = require('../lib/bot');

// Commands
const mmr = require('./mmr');

let commands = { mmr };

// Exported commands
module.exports = {
	register: () => {
		for(let [name, command] of Object.entries(commands)) {
			bot.command(`/${name}`, (...args) => command(...args));
		}
	}
};
