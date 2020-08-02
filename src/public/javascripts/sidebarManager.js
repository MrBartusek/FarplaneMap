import Task from './task.js';

export default class SidebarManager
{	
	constructor(data, mapManager, dialogManager)
	{
		this.tasks = data;
		this.mapManager = mapManager;
		this.dialogManager = dialogManager;
	}

	renderTasksList()
	{
		if(SidebarManager.currentView == 'list') return;
		SidebarManager.currentView = 'list';

		let tasksList = '';
		let i = 0;
		for(const taskRaw of [...this.tasks].sort((a,b) => b.completedPercentage - a.completedPercentage))
		{
			const task = new Task(taskRaw);
			tasksList += `
			<div id="task-${task.id}" class="sidebar-section-big-list-item sidebar-task sidebar-task-${task.lowerCaseType()}">
				<i class="material-icons"> ${task.getIconName()}</i>
				${task.name} 
			</div>`;
			i++;
		}
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-brand">
			<img src="/images/logo192.png" class="sidebar-brand-logo"></img>
		</div>
		<div class="sidebar-subtitle">
			<i class="material-icons">public</i> Interactive Excursion Map
		</div>
		<div class="sidebar-section sidebar-section-buttons">
			<div class="sidebar-button">
				<i class="material-icons">person</i>
				Select Player
			</div>
			<div class="sidebar-button" id="button-show-ranking">
				<i class="material-icons">people</i>
				Ranking
			</div>
			<div class="sidebar-button" id="button-show-help">
				<i class="material-icons">info</i>
				Help
			</div>
			<a href="https://discord.gg/vUn6dVa" target='_blank' rel="noopener noreferrer" class="sidebar-button">
				<i class="material-icons">chat</i>
				Discord
			</a>
		</div>
		<div class="sidebar-section sidebar-section-big-list" style="overflow-y: scroll;">
         ${tasksList}
      </div>
		`;

		document.getElementById('button-show-ranking').addEventListener('click', () => this.dialogManager.showRanking());
		document.getElementById('button-show-help').addEventListener('click', () => this.dialogManager.showHelp());

		for(const task of this.tasks)
		{
			document.getElementById(`task-${task.id}`).addEventListener('click', () => setTimeout(() => this.renderTask(task.id), 70));
		}
	}

	renderTask(id)
	{
		if(SidebarManager.currentView == `task-${id}`) return;
		SidebarManager.currentView = `task-${id}`;
		this.mapManager.center();
		const task = new Task(this.tasks[id]);
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-cover-image" style="background-image: url(${task.image || './images/default-cover.png'});"></div>
		<div class="sidebar-subtitle sidebar-subtitle-${task.lowerCaseType()}">
			<i class="material-icons">${task.getIconName()}</i> ${task.type}
		</div>
		<div class="sidebar-section sidebar-section-buttons">
			<div class="sidebar-button sidebar-button-${task.lowerCaseType()}" id="button-submit-task-${task.id}">
				<i class="material-icons">done</i>
				Submit
			</div>
			<div class="sidebar-button sidebar-button-${task.lowerCaseType()}" id="button-share-task-${task.id}">
				<i class="material-icons">share</i>
				Share
			</div>
		</div>
      <div class="sidebar-section sidebar-title-section">
         ${task.name || 'Unknown Quest'}
         ${task.details ? `<small>${task.details}</small>` : ''}
		</div>
		<div class="sidebar-section sidebar-section-markdown">${task.praseDescription() || '<p>Missing Description</p>'}</div>
		<div class="sidebar-section">
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">${task.humanizeRepeatability()[0]}</i>
				${task.humanizeRepeatability()[1]}
			</div>
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">people</i>
				Completed by ${Math.round(task.completedPercentage)}% of players
			</div>
			${task.popular ? `<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">trending_up</i>
				This task is popular
				</div>` : ''}
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">star</i>
				Award: ${task.experience ? task.experience + 'EP': 'Unknown'}
			</div>
		</div>`;
		
		document.getElementById(`button-submit-task-${task.id}`).addEventListener('click', () => 
			this.dialogManager.submittingTaskHelp(task.name, task.getColor())
		);
		document.getElementById(`button-share-task-${task.id}`).addEventListener('click', () => 
			this.dialogManager.shareTask(task.id, task.lowerCaseType(), task.getColor())
		);
	}
}

