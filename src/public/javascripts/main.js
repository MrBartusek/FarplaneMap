import MapManager from './mapManager.js';
import SidebarManager from './sidebarManager.js';
import DataLoader from './dataLoader.js';
import DialogManager from './dialogManager.js';

const mapManager = new MapManager(2669,1488,'images/wynnmap.jpeg');
mapManager.map.on('click', (e) => console.log('Clicked on empty spot at: ' + e.latlng));

DataLoader.loadData()
	.then(data =>
	{
		const sidebarManager = new SidebarManager(data.tasks, mapManager);
		const dialogManager = new DialogManager();

		sidebarManager.renderTasksList();
		for(const task of data.tasks) {
			if(task.coordinates)
			{
				mapManager.addPinpoint(task.coordinates).on('click', () => renderTask(task.id));
			}
		}

		mapManager.map.on('click', (e) => 
		{
			sidebarManager.renderTasksList();
			mapManager.center();
		});
		window.renderTask = function(id)
		{
			sidebarManager.renderTask(id);
			if(data.tasks[id].coordinates)
			{
				mapManager.setView(data.tasks[id].coordinates, true);
			}
			else
			{
				mapManager.center();
			}
		};
		window.showRanking = function()
		{
			dialogManager.showRanking([...data.players].sort());
		};
		window.showHelp = function()
		{
			dialogManager.showHelp();
		};
		window.hideDialog = function()
		{
			dialogManager.hide();
		};
	})
	.catch((error) => 
	{
		console.log(`FAILED TO LOAD DATA\r\nCODE: ${error.code}\r\nMESSAGE: ${error.message}`);
		document.getElementById('sidebar').innerHTML = '<i class="material-icons error-icon">warning</i>';
	});

