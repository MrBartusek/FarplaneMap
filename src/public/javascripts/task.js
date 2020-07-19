export default class Task
{
	constructor(data)
	{
		this.name = data.name;
		this.description = data.description;
		this.details = data.details;
		this.experience = data.experience;
		this.type = data.type;
		this.coordinates = data.coordinates;
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

	getIconColorClass()
	{
		switch(this.type)
		{
		case 'Excursion':
			return 'icon-excursion';
		case 'Mission':
			return 'icon-mission';
		case 'Dare':
			return 'icon-dare';
		default:
			console.warn(`Unknown type for ${task.name} -> ${task.type}`);
			return '';
		}
	}

	getSubtitleColorClass()
	{
		switch(this.type)
		{
		case 'Excursion':
			return 'sidebar-subtitle-excursion';
		case 'Mission':
			return 'sidebar-subtitle-mission';
		case 'Dare':
			return 'sidebar-subtitle-dare';
		default:
			console.warn(`Unknown type for ${task.name} -> ${task.type}`);
			return '';
		}
	}
}
