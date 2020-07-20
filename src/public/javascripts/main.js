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
		for (let i = 0; i < data.tasks.length; i++) {
			const task = data.tasks[i];
			if(task.coordinates)
			{
				mapManager.addPinpoint(task.coordinates).on('click', () => renderTask(i));
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
			dialogManager.showRanking(data.players);
		};
		window.showHelp = function()
		{
			dialogManager.showHelp();
		};
		window.hideDialog = function()
		{
			dialogManager.hide();
		};
	});

