export default class Task
{
	constructor(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.details = data.details;
		this.experience = data.experience;
		this.type = data.type;
		this.coordinates = data.coordinates;
		this.repeatable = data.repeatable;
		this.popular = data.popular;
		this.completedPercentage = data.completedPercentage;
	}

	getIconName()
	{
		switch(this.type)
		{
		case 'Excursion':
			return 'directions_walk';
		case 'Mission':
			return 'assignment';
		case 'Dare':
			return 'local_fire_department';
		default:
			console.warn(`Unknown type for ${task.name} -> ${task.type}`);
			return 'star';
		}
	}

	humanizeRepeatability()
	{
		switch(this.repeatable)
		{
		case 'no':
			return ['sync_disabled', 'Not Repeatable'];
		case 'yes':
			return ['cached', 'Can be repeated'];
		case 'event':
			return ['event', 'Can be repeated during events'];
		default:
			return ['report_problem', 'Unknown Repeatability'];
		}
	}

	lowerCaseType()
	{
		return this.type.toLowerCase();
	}
}
