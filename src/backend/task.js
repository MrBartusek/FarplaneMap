class Task
{
	constructor(id, name, coordinates, description, experience, repeatable, type, mapCoordinates, images)
	{
		this.id = id;
		this.name = name || 'Unknown';
		this.coordinates = coordinates || undefined;
		this.description = description || undefined;
		this.experience = parseInt(experience) || 0;
		this.repeatable = repeatable || 'no';
		this.type = type;
		this.mapCoordinates = mapCoordinates;
		this.images = images;
	}
   
	addStatistic(completedPercentage)
	{
		this.completedPercentage = Math.round(completedPercentage * 100) / 100;
	}

	setPopular()
	{
		this.popular = true;
	}
}

module.exports = Task;
