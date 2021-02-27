import Task from './task.js';
import Player from './player.js';
import ChartManager from './chartManager.js';
import DataLoader from './dataLoader.js';
import updateGallery from './gallery .js';
import SearchManager from './SearchManager.js';

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
		this.searchManager = new SearchManager(this, this.tasks, this.playerManager);
	}

	renderTasksList()
	{
		if(this.currentView == 'list') return;
		this.currentView = 'list';

		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-brand"></div>
		
		<div class="sidebar-subtitle ${this.playerManager.playerAvailable() ? 'sidebar-subtitle-clickable' : ''}">
		${this.playerManager.playerAvailable() ? 
		`<i class="material-icons">person</i> ${this.playerManager.getPlayer().name} - ${this.playerManager.getPlayer().experience} EP` :
		'<i class="material-icons">public</i> Interactive Excursion Map' }

		</div>
		<div class="sidebar-section sidebar-section-buttons sidebar-section-buttons-orange">
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
		<div class="sidebar-subtitle sidebar-subtitle-gray">Task List</div>

		<div class="sidebar-section sidebar-section-big-list" id="tasks-list-section" style="overflow-y: scroll; flex: 1;">
			<div class="sidebar-search-container" id="search">
				<input type="text" class="sidebar-search">
				<div class="sidebar-search-icon material-icons">search</div>
				<div class="sidebar-search-helpers">
					<div class="sidebar-search-button">Status</div>
					<div class="sidebar-search-button">Type</div>
				</div>
			</div>
			<div id="tasks-list"></div>
      </div>
		`;
		
		this.searchManager.handleSearch();
		document.getElementById('button-show-ranking').addEventListener('click', () => this.dialogManager.showRanking());
		document.getElementById('button-show-help').addEventListener('click', () => this.dialogManager.showHelp());
		if(this.playerManager.playerAvailable())
		{
			document.getElementsByClassName('sidebar-subtitle')[0].addEventListener('click', () => this.renderPlayer(this.playerManager.getPlayer().id));
		}
		document.getElementById('tasks-list-section').addEventListener('scroll', (e) =>
		{
			this.lastTaskListScrollTop = document.getElementById('tasks-list-section').scrollTop;
		});
		if(this.lastTaskListScrollTop)
		{
			document.getElementById('tasks-list-section').scrollTop = this.lastTaskListScrollTop;
		}
	}

	renderTask(id)
	{
		if(this.currentView == `task-${id}`) return;
		this.currentView = `task-${id}`;

		const task = new Task(this.tasks.find(x => x.id == id));
		if(task.mapCoordinates && task.mapCoordinates.length == 1)
		{
			this.mapManager.setView(task.mapCoordinates[0], 2);
		}
		else
		{
			this.mapManager.center();
		}

		let imagesList = '';
		if(task.images && task.images.length > 1)
		{
			for(const image of task.images)
			{
				imagesList += `<div class="sidebar-gallery-image" style="background-image: url(\'${image}\');"></div>`;
			}
		}
		else if(task.images)
		{
			imagesList = `<div class="sidebar-gallery-image" style="display: block; background-image: url(\'${task.images[0]}\');"></div>`;
		}
		else
		{
			imagesList += '<div class="sidebar-gallery-image" style="display: block; background-image: url(\'./images/default-cover.png\')"></div>';
		}

		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-cover-gallery">
			${task.images && task.images.length > 1 ? `
			<i class="gallery-slide-prev gallery-navigation material-icons">arrow_back_ios</i>
			<i class="gallery-slide-next gallery-navigation material-icons">arrow_forward_ios</i>` : ''}
			${imagesList}
		</div>
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
		<div class="sidebar-section sidebar-section-markdown sidebar-section-overflow">${task.praseDescription() || '<p>Missing Description</p>'}</div>
		<div class="sidebar-section">
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">cached</i>
				Repeatable ${task.humanizeRepeatability()}
			</div>
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">people</i>
				Completed by ${Math.round(task.completedPercentage)}% of players
			</div>
			<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">edit</i>
				Author: ${task.author}
			</div>
			${task.popular ? `<div class="sidebar-section-list-item">
				<i class="material-icons icon-${task.lowerCaseType()}">trending_up</i>
				This task is popular
				</div>` : ''}
		</div>`;

		if(task.images && task.images.length > 1)
		{
			updateGallery();
		}
		document.getElementById(`button-submit-task-${task.id}`).addEventListener('click', () => 
		{
			this.dialogManager.submittingTaskHelp(task.name, task.getColor());
		});
		document.getElementById(`button-share-task-${task.id}`).addEventListener('click', () => 
		{
			this.dialogManager.shareTask(task);
		});
		if(task.coordinates)
		{
			document.getElementById('compass-' + task.id).addEventListener('click', () =>
			{
				this.dialogManager.compassCommand(task);
			});
		}
		const description = document.getElementsByClassName('sidebar-section-markdown')[0];
		const mentions = description.innerHTML.match(/&lt;@\d+&gt;/g);
		if (mentions != null)
		{
			for (const mention of mentions)
			{
				id = mention.replace('&lt;@','').replace('&gt;', '');
				new DataLoader().loadDiscordData(id)
					.then((data) =>
					{
						console.log(`Successfully parsed mention! ${mention} -> ${data.username}`);
						description.innerHTML = description.innerHTML.replace(mention, `@${data.username}`);
					})
					.catch((error) =>
					{
						if(error.error === true)
						{
							console.log(`Discord Backend Sent Error: \r\ncode: ${error.code}\r\nmessage: ${error.message}`);
						}
						else
						{
							throw error;
						}
					});
			}
		}
	}

	renderPlayer(id)
	{
		if(this.currentView == `player-${id}`) return;
		this.currentView = `player-${id}`;

		this.mapManager.center();

		const player = new Player(this.players.find((x) => x.id == id));
		const thisPlayerSelected = this.playerManager.playerAvailable() && this.playerManager.getPlayer().id == player.id;
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-profile-header">
			<div id="discord-avatar" class="sidebar-profile-avatar"></div>
			<div class="sidebar-profile-name">${player.name}</div>
			<small id="discord-name">Discord Unknown</small>
		</div>
		<div class="sidebar-section sidebar-section-buttons">
			<div class="sidebar-button" id="button-select-player-${player.id}">
				<i class="material-icons">${thisPlayerSelected ? 'cancel' : 'person'}</i>
				${thisPlayerSelected ? 'Un-Select' : 'Select'}
			</div>
			<div class="sidebar-button" id="button-share-player-${player.id}">
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
			this.playerManager.setPlayer(thisPlayerSelected ? undefined : player.id);
			setTimeout(() => this.renderTasksList(), 70);
		});
		document.getElementById(`button-share-player-${player.id}`).addEventListener('click', () => 
		{
			this.dialogManager.sharePlayer(player);
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

