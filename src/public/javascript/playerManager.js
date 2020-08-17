export default class PlayerManager
{
	constructor(players)
	{
		this.players = players;
	}
   
	playerAvailable()
	{
		return this.getPlayer() != null;
	}
   
	getPlayer()
	{
		const cookie = Cookies.get('farplane-user');
		return this.players.find((x) => x.name == cookie);
	}

	setPlayer(id)
	{
		if(id)
		{
			const player = this.players.find((x) => x.id == id);
			Cookies.set('farplane-user', player.name);
		}
		else
		{
			Cookies.remove('farplane-user');
		}
	}
}
