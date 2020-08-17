const fetch = require('node-fetch');
const escape = require('./escape');

class DiscordFetcher
{
	async getUser(id)
	{
		let result = { requestedAt: String(+new Date) };
		return fetch('https://discord.com/api/v6/users/' + id, { headers: { Authorization: `Bot ${process.env.FARPLANE_DISCORD_KEY}`}})
			.then(res => res.json())
			.then((data) =>
			{
				if(Array.isArray(data.user_id))
				{
					throw new Error('Invalid Snowflake');
				}
				result.id = escape(data.id);
				result.username = escape(data.username) + '#' + data.discriminator;
				result.avatar = `https://cdn.discordapp.com/avatars/${escape(data.id)}/${escape(data.avatar)}.${data.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`;
				return result;
			});
	}
}

module.exports = DiscordFetcher;
