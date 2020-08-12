
class DiscordFetcher
{
	async getUser(id)
	{
		let result = { requestedAt: String(+new Date)};
		result.id = id;
		return result;
	}
}

module.exports = DiscordFetcher;
