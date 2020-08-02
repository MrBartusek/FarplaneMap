export default class PlayerManager
{
	constructor(users)
	{
		this.users = users;
	}
   
	playerAvailable()
	{
		return this.getPlayer() != null;
	}
   
	getPlayer()
	{
		const cookie = Cookies.get('farplane-user');
		return this.users.find((x) => x.name == cookie);
	}

	getTaskCompletionIcon()
	{
		
	}
}
