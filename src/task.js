class Task
{
	constructor(id ,name, details, description, experience, repeatable, type, coordinates, image)
	{
		this.id = id;
		this.name = name || 'Unknown';
		this.details = details || undefined;
		this.description = description || undefined;
		this.experience = parseInt(experience) || 0;
		this.repeatable = repeatable || 'no';
		this.type = type;
		this.coordinates = coordinates;
		this.image = image;
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
