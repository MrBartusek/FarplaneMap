export default class Player
{
	constructor(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.discord = data.discord;
		this.experience = data.experience;
		this.completedMissions = data.completedMissions;
		this.completedExcursions = data.completedExcursions;
		this.completedDares = data.completedDares;
		this.completedTasks = data.completedTasks;
	}
}
