class Player
{
	constructor(name)
	{
		this.name = name;
		this.experience = 0;
		this.completedTasks = [];
	}
   
	addCompletedTask(task)
	{
		this.experience += task.experience; 
		this.completedTasks.push(task.id);
	}
}

module.exports = Player;
