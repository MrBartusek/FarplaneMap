export default class ShareManager
{
	constructor(tasksList)
	{
		this.tasksList = tasksList;
	}

	createUrl(taskId)
	{
		const task = this.tasksList[taskId];
		const result = '/task/' + encodeURIComponent(task.name.toLowerCase()).replace(/%20/g, '+');
		if(this.praseUrl(result) && this.praseUrl(result).id == taskId)
		{
			return window.location.protocol + '//' + window.location.host + result;
		}
		else
		{
			return 'Failed to generate URL: Generated url don\'t prase to same task';
		}
	}
   
	praseUrl(pathname)
	{
		const taskName = decodeURIComponent(pathname.replace('/task/', '').replace(/\+/g, '%20'));
		return this.tasksList.find((x) => x.name.toLowerCase() == taskName);
	}
}
