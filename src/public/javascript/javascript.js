export default class Player
{
	constructor(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.experience = data.experience;
		this.completedTasks = data.completedTasks;
	}
}
