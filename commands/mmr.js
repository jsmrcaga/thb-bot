const RocketLeague = require('../rocket-league');
const bot = require('../lib/bot');

module.exports = ({ args: { variables, options } , data }) => {
	let [ user_arg_id ] = variables;

	// Fetch MMR and send
	let user_id = parseInt(user_arg_id) || 972527;
	RocketLeague.mmr([user_id]).then(players => {
		let concerned_player = players.find(p => p.PlayerId === user_id);
		if(!concerned_player) {
			return bot.message({
				channel: data.channel_id,
				content: `Oopsy, could not find any player with id ${user_id}`
			});
		}
		// Create messages and send
		let fields = [];
		for(let mmr of concerned_player.mmr) {
			fields.push({
				name: `${mmr.Value.Label} (_**${mmr.Other.subtitle}**_ - *${mmr.Other.subtitle2}*)`,
				value:`**${mmr.Value.ValueInt}**`
			});
		}

		return bot.message({
			channel: data.channel_id,
			content: {
				embed: {
					fields,
					thumbnail: {
						url: "https://img.favpng.com/12/11/8/rocket-league-logo-t-shirt-png-favpng-9tHvKE75AdYSJurjXbQvnKZRd.jpg"
					},
					author: {
						name: concerned_player.platformUserHandle
					},
					description: `[Rank distribution](https://rocketleague.tracker.network/distribution/11)`
				}
			}
		});
	}).then(() => {}).catch(e => {
		console.error(e);
	});
};
