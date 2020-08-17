import Task from './task.js';

export default class SearchManager
{
	constructor(sidebarManager, tasksList, playerManager)
	{
		this.tasksList = tasksList;
		this.playerManager = playerManager;
		this.sidebarManager = sidebarManager;
		this.completedState = 0;
		this.typeState = 0;
	}
	
	handleSearch()
	{
		if(!this.playerManager.playerAvailable())
		{
			this.completedState = 0;
		}
		this.updateTasksList();
		const search = document.getElementById('search');
		const buttons = search.getElementsByClassName('sidebar-search-helpers')[0].children;

		this.updateStatusButton(buttons[0]);
		buttons[0].addEventListener('click', (e) => 
		{ 
			if(!this.playerManager.playerAvailable()) return;
			this.completedState++;
			this.updateStatusButton(buttons[0]);
			this.updateTasksList();
		});

		this.updateEventButton(buttons[1]);
		buttons[1].addEventListener('click', (e) => 
		{ 
			this.typeState++;
			this.updateEventButton(buttons[1]);
			this.updateTasksList();
		});

		search.getElementsByClassName('sidebar-search')[0].addEventListener('input', () =>
		{
			this.updateTasksList();
		});
	}

	search() 
	{
		const query = search.getElementsByClassName('sidebar-search')[0].value;
		let result = this.tasksList;
		result.sort((a,b) => b.completedPercentage - a.completedPercentage);
		if(query.length > 0)
		{
			result = result.filter(x =>
				Object.values(x)
					.join(' ')
					.toLowerCase()
					.match(query.toLowerCase()));
		}

		if(this.completedState == 1 && this.playerManager.playerAvailable())
		{
			result = result.filter(x => this.playerManager.getPlayer().completedTasks.includes(x.id));
		}
		else if(this.completedState == 2 && this.playerManager.playerAvailable())
		{
			result = result.filter(x => !this.playerManager.getPlayer().completedTasks.includes(x.id));
		}

		if(this.typeState == 1)
		{
			result = result.filter(x => x.repeatable == 'event');
		}
		else if(this.typeState == 2)
		{
			result = result.filter(x => x.repeatable != 'event');
		}

		return result;
	}

	updateTasksList()
	{
		let tasksList = '';
		let i = 0;
		for(const taskRaw of this.search())
		{
			const task = new Task(taskRaw);
			tasksList += `
			<div id="task-${task.id}" class="sidebar-section-big-list-item sidebar-task sidebar-task-${task.lowerCaseType()}">
				<i class="material-icons"> ${task.getIconName()}</i>
				${task.name} 
			</div>`;
			i++;
		}
		document.getElementById('tasks-list').innerHTML = tasksList;
		for(const task of this.search())
		{
			document.getElementById(`task-${task.id}`).addEventListener('click', () => setTimeout(() => this.sidebarManager.renderTask(task.id), 70));
		}
	}

	updateStatusButton(button)
	{
		if(this.completedState == 0)
		{
			button.classList.remove('active');
			button.innerHTML = 'Status';
		}
		else if(this.completedState == 1)
		{
			button.classList.add('active');
			button.innerHTML = 'Completed';
		}
		else if(this.completedState == 2)
		{
			button.classList.add('active');
			button.innerHTML = 'Un-Completed';
		}
		else
		{
			button.classList.remove('active');
			button.innerHTML = 'Status';
			this.completedState = 0;
		}
	}

	updateEventButton(button)
	{
		if(this.typeState == 0)
		{
			button.classList.remove('active');
			button.innerHTML = 'Type';
		}
		else if(this.typeState == 1)
		{
			button.classList.add('active');
			button.innerHTML = 'Event';
		}
		else if(this.typeState == 2)
		{
			button.classList.add('active');
			button.innerHTML = 'No Event';
		}
		else
		{
			button.classList.remove('active');
			button.innerHTML = 'Type';
			this.typeState = 0;
		}
	}
}


