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
		this.updateTasksList();
		const search = document.getElementById('search');
		const helpers = search.getElementsByClassName('sidebar-search-helpers')[0].children;
		helpers[0].addEventListener('click', (e) => 
		{ 
			this.completedState++;
			if(this.completedState == 0)
			{
				helpers[0].classList.remove('active');
				helpers[0].innerHTML = 'Status';
			}
			else if(this.completedState == 1)
			{
				helpers[0].classList.add('active');
				helpers[0].innerHTML = 'Completed';
			}
			else if(this.completedState == 2)
			{
				helpers[0].classList.add('active');
				helpers[0].innerHTML = 'Un-Completed';
			}
			else
			{
				helpers[0].classList.remove('active');
				helpers[0].innerHTML = 'Status';
				this.completedState = 0;
			}
			this.updateTasksList();
		});
		helpers[1].addEventListener('click', (e) => 
		{ 
			this.typeState++;
			if(this.typeState == 0)
			{
				helpers[1].classList.remove('active');
				helpers[1].innerHTML = 'Type';
			}
			else if(this.typeState == 1)
			{
				helpers[1].classList.add('active');
				helpers[1].innerHTML = 'Event';
			}
			else if(this.typeState == 2)
			{
				helpers[1].classList.add('active');
				helpers[1].innerHTML = 'No Event';
			}
			else
			{
				helpers[1].classList.remove('active');
				helpers[1].innerHTML = 'Type';
				this.typeState = 0;
			}
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
		if(this.completedState == 1)
		{
			result = result.filter(x => this.playerManager.getPlayer().completedTasks.includes(x.id));
		}
		else if(this.completedState == 2)
		{
			result = result.filter(x => !this.playerManager.getPlayer().completedTasks.includes(x.id));
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
}


