export default class Task
{
	constructor(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.author = data.author;
		this.details = data.details;
		this.experience = data.experience;
		this.type = data.type;
		this.mapCoordinates = data.mapCoordinates;
		this.coordinates = data.coordinates;
		this.repeatable = data.repeatable;
		this.popular = data.popular;
		this.completedPercentage = data.completedPercentage;
		this.images = data.images;
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
		if (this.repeatable < 0)
			return '∞ times';
		else if (this.repeatable == 1)
			return '1 time';
		else
			return (this.repeatable + ' times');
	}

	lowerCaseType()
	{
		return this.type && this.type.toLowerCase();
	}

	praseDescription()
	{
		window.linkClass = `sidebar-link-${this.lowerCaseType()}`;
		var renderer = new marked.Renderer();
		renderer.link = function(href, title, text) 
		{
			var link = marked.Renderer.prototype.link.call(this, href, title, text);
			return link.replace('<a',`<a target=\'_blank\' class="${window.linkClass}" `);
		};
		marked.setOptions({renderer: renderer });
		let result = marked(this.description);
		result += (this.coordinates ? `<p>Coordinates: <a id="compass-${this.id}" class="${window.linkClass}">${this.coordinates}</a></p>` : '');
		result += (this.repeatable > 1 ? '<p style="font-style: italic">Keep in mind each bullet point (-) is a task. You can make a task submission per bullet point</p>' : '');
		return result ;
	}

	completionIcon(playerManager)
	{
		if(playerManager.playerAvailable())
		{
			if(playerManager.getPlayer().completedTasks.includes(this.id))
			{
				return '<i class="material-icons completion-icon" style="color: #27ae60;">check_circle_outline</i>';
			}
			else
			{
				return '<i class="material-icons completion-icon" style="color: #c0392b;">remove_circle_outline</i>';
			}
		}
		else
		{
			return '';
		}
	}
}
