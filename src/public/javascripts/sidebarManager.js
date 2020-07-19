import Task from './task.js';

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
		for(const taskRaw of this.tasks)
		{
			const task = new Task(taskRaw);
			tasksList += `
			<div onclick="renderTask(${i})" class="sidebar-section-big-list-item sidebar-task sidebar-task-${task.lowerCaseType()}">
				<i class="material-icons"> ${task.getIconName()}</i>
				${task.name} 
			</div>`;
			i++;
		}
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-brand">
			<img src="/images/logo192.png" class="sidebar-brand-logo"></img>
		</div>
		<div class="sidebar-section">
			social thingies
		</div>
		<div class="sidebar-section sidebar-section-big-list" style="overflow-y: scroll;">
         ${tasksList}
      </div>
		`;
	}

	renderTask(id)
	{
		if(SidebarManager.currentView == `task-${id}`) return;
		SidebarManager.currentView = `task-${id}`;

		const task = new Task(this.tasks[id]);
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-cover-image" style="background-image: url(${task.image || './images/default-cover.png'});"></div>
		<div class="sidebar-subtitle sidebar-subtitle-${task.lowerCaseType()}">
			${task.type}
		</div>
      <div class="sidebar-section sidebar-title-section">
         ${task.name || 'Unknown Quest'}
         ${task.details ? `<small>${task.details}</small>` : ''}
		</div>
		<div class="sidebar-section">
		    action buttons
		</div>
		<div class="sidebar-section">${task.description || 'Missing Description'}</div>
		<div class="sidebar-section">
		<div class="sidebar-section-list-item"><i class="material-icons icon-${task.lowerCaseType()}">directions_walk</i> Excursion</div>
         <div class="sidebar-section-list-item"><i class="material-icons icon-${task.lowerCaseType()}">star</i> Prize: ${task.experience}EP</div>
      </div>`;
	}


	
}

