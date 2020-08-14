import Task from './task.js';
import Player from './player.js';
import ChartManager from './chartManager.js';
import DataLoader from './dataLoader.js';

export default class SidebarManager
{	
	constructor(data, mapManager, dialogManager, playerManager)
	{
		this.tasks = data.tasks;
		this.players = data.players;
		this.statistics = data.statistics;
		this.mapManager = mapManager;
		this.dialogManager = dialogManager;
		this.playerManager = playerManager;
	}

	renderTasksList()
	{
		if(this.currentView == 'list') return;
		this.currentView = 'list';

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
		
		<div class="sidebar-subtitle ${this.playerManager.playerAvailable() ? 'sidebar-subtitle-clickable' : ''}">
		${this.playerManager.playerAvailable() ? 
		`<i class="material-icons">person</i> ${this.playerManager.getPlayer().name} - ${this.playerManager.getPlayer().experience} EP` :
		'<i class="material-icons">public</i> Interactive Excursion Map' }

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
		<div class="sidebar-section sidebar-section-big-list" id="tasks-list" style="overflow-y: scroll;">
         ${tasksList}
      </div>
		`;

		document.getElementById('button-show-ranking').addEventListener('click', () => this.dialogManager.showRanking());
		document.getElementById('button-show-help').addEventListener('click', () => this.dialogManager.showHelp());

		for(const task of this.tasks)
		{
			document.getElementById(`task-${task.id}`).addEventListener('click', () => setTimeout(() => this.renderTask(task.id), 70));
		}
		if(this.playerManager.playerAvailable())
		{
			document.getElementsByClassName('sidebar-subtitle')[0].addEventListener('click', () => this.renderPlayer(this.playerManager.getPlayer().id));
		}

		document.getElementById('tasks-list').addEventListener('scroll', (e) =>
		{
			this.lastTaskListScrollTop = document.getElementById('tasks-list').scrollTop;
		});
		if(this.lastTaskListScrollTop)
		{
			document.getElementById('tasks-list').scrollTop = this.lastTaskListScrollTop;
		}
	}

	renderTask(id)
	{
		if(this.currentView == `task-${id}`) return;
		this.currentView = `task-${id}`;

		const task = new Task(this.tasks[id]);
		if(task.mapCoordinates)
		{
			this.mapManager.setView(task.mapCoordinates, 2);
		}
		else
		{
			this.mapManager.center();
		}

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
			${task.name} 
			${task.completionIcon(this.playerManager)}
			<small>Experience Points: ${task.experience}</small>
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
		</div>`;
		
		document.getElementById(`button-submit-task-${task.id}`).addEventListener('click', () => 
			this.dialogManager.submittingTaskHelp(task.name, task.getColor())
		);
		document.getElementById(`button-share-task-${task.id}`).addEventListener('click', () => 
			this.dialogManager.shareTask(task.id, task.lowerCaseType(), task.getColor())
		);
	}

	renderPlayer(id)
	{
		if(this.currentView == `player-${id}`) return;
		this.currentView = `player-${id}`;

		this.mapManager.center();

		const player = new Player(this.players.find((x) => x.id == id));
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-profile-header">
			<div id="discord-avatar" class="sidebar-profile-avatar"></div>
			<div class="sidebar-profile-name">${player.name}</div>
			<small id="discord-name">Discord Unknown</small>
		</div>
		<div class="sidebar-section sidebar-section-buttons">
			<div class="sidebar-button" id="button-select-player-${player.id}">
				<i class="material-icons">person</i>
				Select
			</div>
			<div class="sidebar-button">
				<i class="material-icons">share</i>
				Share
			</div>
		</div>
		<div class="sidebar-section">
			Completed Missions: ${player.completedMissions}/${this.statistics.totalMissions}
			<canvas id="chart-total-missions" height="30"></canvas>
			Completed Excursions: ${player.completedExcursions}/${this.statistics.totalExcursions}
			<canvas id="chart-total-excursions" height="30"></canvas>
			Completed Dares: ${player.completedDares}/${this.statistics.totalDares}
			<canvas id="chart-total-dares" height="30"></canvas>
		</div>
		<div class="sidebar-section">
		<div class="sidebar-section-list-item">
			<i class="material-icons sidebar-profile-icon">star</i>
			Experience Points: ${player.experience}
		</div>
		<div class="sidebar-section-list-item">
			<i class="material-icons sidebar-profile-icon">trending_up</i>
			Ranking Position: #${player.ranking}
		</div>
		`;

		document.getElementById(`button-select-player-${player.id}`).addEventListener('click', () => 
		{
			this.playerManager.setPlayer(player.id);
			setTimeout(() => this.renderTasksList(), 70);
		});

		ChartManager.progressChart(document.getElementById('chart-total-missions'), '#e67e22', player.completedMissions, this.statistics.totalMissions);
		ChartManager.progressChart(document.getElementById('chart-total-excursions'), '#27ae60', player.completedExcursions , this.statistics.totalExcursions);
		ChartManager.progressChart(document.getElementById('chart-total-dares'), '#9b59b6', player.completedDares, this.statistics.totalDares);

		new DataLoader().loadDiscordData(player.discord)
			.then((data) =>
			{
				document.getElementById('discord-avatar').style.backgroundImage = `url(${data.avatar})`;
				document.getElementById('discord-name').innerHTML = data.username;
			})
			.catch((error) =>
			{
				if(error.error === true)
				{
					console.log(`Discord Backend Sent Error: \r\ncode: ${error.code}\r\nmessage: ${error.message}`);
					document.getElementById('discord-avatar').style.backgroundImage = 'url(images/discord-default.png)';
				}
				else
				{
					throw error;
				}
			});
	}
}

