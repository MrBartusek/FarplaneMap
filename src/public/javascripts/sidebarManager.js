export default class SidebarManager
{	
	constructor(data, mapManager)
	{
		this.tasks = data;
		this.mapManager = mapManager;
	}

	renderTasksList()
	{
		if(SidebarManager.currentView == 'list') return;
		SidebarManager.currentView = 'list';

		let tasksList = '';
		let i = 0;
		for(const task of this.tasks)
		{
			let result = `<div onclick="renderTask(${i})" class="sidebar-section-list sidebar-task">`;
			switch(task.type)
			{
			case 'Excursion':
				result += '<i class="material-icons">directions_walk</i>';
				break;
			case 'Mission':
				result += '<i class="material-icons">assignment</i>';
				break;
			case 'Dare':
				result += '<i class="material-icons">local_fire_department</i>';
				break;
			default:
				console.warn(`Unknown type for ${task.name} -> ${task.type}`);
				result += '<i class="material-icons">star</i>';
				break;
			}
			result += `${task.name} </div>`;
			tasksList += result;
			i++;
		}
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-header">
			<img src="/images/logo192.png" class="sidebar-header-logo"></img>
		</div>
		<div class="sidebar-section">
			social thingies
		</div>
		<div class="sidebar-section sidebar-section-thin" style="overflow-y: scroll;">
         ${tasksList}
      </div>
		`;
	}

	renderTask(id)
	{
		if(SidebarManager.currentView == `task-${id}`) return;
		SidebarManager.currentView = `task-${id}`;

		const task = this.tasks[id];
		document.getElementById('sidebar').innerHTML = `
      <div class="sidebar-cover" style="background-image: url(${task.image || './images/default-cover.png'});"></div>
      <div class="sidebar-section sidebar-title-section">
         ${task.name || 'Unknown Quest'}
         ${task.details ? `<small>${task.details}</small>` : ''}
		</div>
		<div class="sidebar-section">
		    action buttons
		</div>
		<div class="sidebar-section">${task.description || 'Missing Description'}</div>
		<div class="sidebar-section">
		<div class="sidebar-section-list"><i class="material-icons">directions_walk</i> Excursion</div>
         <div class="sidebar-section-list"><i class="material-icons">star</i> Prize: ${task.experience}EP</div>
      </div>`;
	}
}

