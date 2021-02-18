import MapManager from './mapManager.js';
import SidebarManager from './sidebarManager.js';
import DataLoader from './dataLoader.js';
import DialogManager from './dialogManager.js';
import ShareManager from './shareManager.js';
import PlayerManager from './playerManager.js';
import NotificationManager from './notificationManager.js';

const mapManager = new MapManager(2669,1488,'images/wynnmap.jpeg');
mapManager.map.on('click', (e) => console.log('Clicked on empty spot at: ' + e.latlng));

new DataLoader().loadData()
	.then(data =>
	{
		new NotificationManager().showEventNotification();
		const playerManager = new PlayerManager(data.players);
		const shareManager = new ShareManager(data.tasks, data.players);
		const dialogManager = new DialogManager(data.players, shareManager);
		const sidebarManager = new SidebarManager(data, mapManager, dialogManager, playerManager);
		dialogManager.addSidebarManager(sidebarManager);

		for(const task of data.tasks) {
			if(task.mapCoordinates)
			{
				for(const coordinate of task.mapCoordinates)
				{
					console.log(coordinate);
					mapManager.addPinpoint(coordinate).on('click', () => 
					{
						sidebarManager.renderTask(task.id);
					});
				}
			}
		}
		
		if(location.pathname.startsWith('/task/'))
		{
			const sharedTask = shareManager.praseTaskUrl(location.pathname);
			if(sharedTask && sharedTask.id >= 0)
			{
				sidebarManager.renderTask(sharedTask.id);
			}
			else
			{
				dialogManager.showDialog(
					'Invalid URL', 
					'Provided task share link is not valid' + '<br>' +
					'Requests task might not exist anymore or link contain typos' + '<br><br>' +
					`<b>Requested url:</b> <pre>${window.location}</pre>`, '#e74c3c');
				sidebarManager.renderTasksList();
			}
		}
		else if(location.pathname.startsWith('/player/'))
		{
			const sharedPlayer = shareManager.prasePlayerUrl(location.pathname);
			if(sharedPlayer && sharedPlayer.id >= 0)
			{
				sidebarManager.renderPlayer(sharedPlayer.id);
			}
			else
			{
				dialogManager.showDialog(
					'Invalid URL', 
					'Provided player share link is not valid' + '<br>' +
					'Requests player might not exist anymore or link contain typos' + '<br><br>' +
					`<b>Requested url:</b> <pre>${window.location}</pre>`, '#e74c3c');
				sidebarManager.renderTasksList();
			}
		}
		else
		{
			sidebarManager.renderTasksList();
		}

		mapManager.map.on('click', (e) => 
		{
			sidebarManager.renderTasksList();
			mapManager.center();
		});
	})
	.catch((error) => 
	{
		document.getElementById('sidebar').innerHTML = '<i class="material-icons error-icon">warning</i>';
		if(error.error === true)
		{
			console.log(`Backend Sent Error: \r\ncode: ${error.code}\r\nmessage: ${error.message}`);
		}
		else
		{
			throw error;
		}
	});

