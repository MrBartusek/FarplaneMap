import MapManager from './mapManager.js';
import SidebarManager from './sidebarManager.js';
import DataLoader from './dataLoader.js';
import DialogManager from './dialogManager.js';
import ShareManager from './shareManager.js';

const mapManager = new MapManager(2669,1488,'images/wynnmap.jpeg');
mapManager.map.on('click', (e) => console.log('Clicked on empty spot at: ' + e.latlng));

DataLoader.loadData()
	.then(data =>
	{
		const shareManager = new ShareManager(data.tasks);
		const dialogManager = new DialogManager(data.players, shareManager);
		const sidebarManager = new SidebarManager(data.tasks, mapManager, dialogManager);

		for(const task of data.tasks) {
			if(task.coordinates)
			{
				mapManager.addPinpoint(task.coordinates).on('click', () => renderTask(task.id));
			}
		}
		
		if(location.pathname.startsWith('/task/'))
		{
			const sharedTask = shareManager.praseUrl(location.pathname);
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
		else
		{
			sidebarManager.renderTasksList();
		}
	})
	.catch((error) => 
	{
		console.log(`FAILED TO LOAD DATA\r\nCODE: ${error.code}\r\nMESSAGE: ${error.message}`);
		document.getElementById('sidebar').innerHTML = '<i class="material-icons error-icon">warning</i>';
	});

