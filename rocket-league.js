const fishingrod = require('fishingrod');

class RocketLeague {
	mmr(playerIds) {
		return fishingrod.fish({
			method: 'POST',
			host: 'rocketleague.tracker.network',
			path: '/live/data',
			data: { playerIds }
		}).then(({ status, headers, response }) => {
			let { players } = JSON.parse(response);

			// Append mmr to player for easy use
			for(let player of players) {
				player.mmr = player.Stats.filter(s => s.Value.Field === 'MMR');
			}

			return players;
		}).catch(e => {
			console.error(e);
		});
	}
}

let rocket = new RocketLeague();
module.exports = rocket;
