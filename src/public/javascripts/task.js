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
			console.warn(`Unknown type for ${this.name} -> ${this.type}`);
			return 'warning';
		}
	}

	getColor()
	{
		switch(this.type)
		{
		case 'Excursion':
			return '#27ae60';
		case 'Mission':
			return '#e67e22';
		case 'Dare':
			return '#9b59b6';
		default:
			return undefined;
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
			return ['event', 'Can be done during events'];
		default:
			return ['report_problem', 'Unknown Repeatability'];
		}
	}

	lowerCaseType()
	{
		return this.type.toLowerCase();
	}
}
