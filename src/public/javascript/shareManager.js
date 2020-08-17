export default class ShareManager
{
	constructor(tasksList, playersList)
	{
		this.tasksList = tasksList;
		this.playersList = playersList;
	}

	createTaskUrl(task)
	{
		const result = '/task/' + encodeURIComponent(task.name.toLowerCase()).replace(/%20/g, '+');
		if(this.praseTaskUrl(result) && this.praseTaskUrl(result).id == task.id)
		{
			return window.location.protocol + '//' + window.location.host + result;
		}
		else
		{
			console.warn(`Failed to generate task share URL\nGot task: ${task.name}\nEncoded it to ${result}\nWhich parsed to ${this.praseTaskUrl(result)}`);
			return 'Failed to generate URL: Generated url don\'t prase to same task';
		}
	}
   
	praseTaskUrl(pathname)
	{
		const taskName = decodeURIComponent(pathname.replace('/task/', '').replace(/\+/g, '%20'));
		return this.tasksList.find((x) => x.name.toLowerCase() == taskName);
	}

	createPlayerUrl(player)
	{
		const result = '/player/' + encodeURIComponent(player.name.toLowerCase()).replace(/%20/g, '+');
		if(this.prasePlayerUrl(result) && this.prasePlayerUrl(result).id == player.id)
		{
			return window.location.protocol + '//' + window.location.host + result;
		}
		else
		{
			console.warn(`Failed to generate player share URL\nGot player ${player.name}\nEncoded it to ${result}\nWhich parsed to ${this.prasePlayerUrl(result)}`);
			return 'Failed to generate URL: Generated url don\'t prase to same player';
		}
	}

	prasePlayerUrl(pathname)
	{
		const playerName = decodeURIComponent(pathname.replace('/player/', '').replace(/\+/g, '%20'));
		return this.playersList.find((x) => x.name.toLowerCase() == playerName);
	}
}
