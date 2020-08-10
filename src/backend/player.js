class Player
{
	constructor(id, name)
	{
		this.id = id;
		this.name = name;
		this.experience = 0;
		this.completedMissions = 0;
		this.completedExcursions = 0;
		this.completedDares = 0;
		this.completedTasks = [];
	}
   
	addCompletedTask(task)
	{
		this.experience += task.experience; 
		this.completedTasks.push(task.id);
		if(task.type == 'Mission')
		{
			this.completedMissions++;
		}
		else if(task.type == 'Excursion')
		{
			this.completedExcursions++;
		}
		else if(task.type == 'Dare')
		{
			this.completedDares++;
		}
	}
}

module.exports = Player;
