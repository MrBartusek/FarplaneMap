const fetch = require('node-fetch');

class DiscordFetcher
{
	async getUser(id)
	{
		let result = { requestedAt: String(+new Date) };
		return fetch('https://discord.com/api/v6/users/' + id, { headers: { Authorization: `Bot ${process.env.FARPLANE_DISCORD_KEY}`}})
			.then(response => response.json())
			.then((data) =>
			{
				console.log(data);
				result.id = data.id;
				result.username = data.username + '#' + data.discriminator;
				result.avatar = `https://cdn.discordapp.com/avatars/${data.id}/a_${data.avatar}.png?size=256`;
				return result;
			});
	}
}

module.exports = DiscordFetcher;
