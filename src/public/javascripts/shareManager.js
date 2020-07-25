export default class ShareManager
{
	constructor(tasksList)
	{
		this.tasksList = tasksList;
	}
	createUrl(taskId)
	{
		const task = this.tasksList[taskId];
		if(task.name.includes('+'))
		{
			return 'Failed to generate URL: Task names cannot contain pluses';
		}
		let result = '';
		result = task.name.replace(/ /g, '+');
		result = result.replace(/'/g, '%27');
		result = result.toLowerCase(); 
		result = '/task/' + result;
		if(this.praseUrl(result) && this.praseUrl(result).id == taskId)
		{
			return window.location.host + result;
		}
		else
		{
			return 'Failed to generate URL: Generated url don\'t prase to same task';
		}
	}
   
	praseUrl(pathname)
	{
		let result;
		result = pathname.replace('/task/', '');
		result = result.replace(/\+/g, ' ');
		result = result.replace(/%27/g, '\'');
		return this.tasksList.find((x) => x.name.toLowerCase() == result);
	}
}
