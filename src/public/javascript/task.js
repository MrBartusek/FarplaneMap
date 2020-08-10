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
		this.mapCoordinates = data.mapCoordinates;
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
		return marked(this.description) + (this.coordinates ? `<p>Coordinates: <a href="501" class="${window.linkClass}">${this.coordinates}</a></p>` : '');
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
