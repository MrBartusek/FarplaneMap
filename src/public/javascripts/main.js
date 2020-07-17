import { loadMap } from './mapLoader.js';
import SidebarManager from './sidebarManager.js';

SidebarManager.renderList(
	[
		{
			'type': 'mission',
			'name': 'test'
		}
	]
);

const icon = L.icon({
	iconUrl: 'images/book.png',
	iconSize: [32, 32]
});

const map = loadMap(2669,1488,'images/wynnmap.jpeg');

L.marker([-180,318], {icon: icon})
	.addTo(map)
	.on('click', (e) => 
	{
		map.panTo(e.latlng);
		SidebarManager.renderTask(
			'https://gamepedia.cursecdn.com/wynncraft_gamepedia_en/d/dc/HczgFHG.png?version=bb833f97adf60c4d8361d0cdbe9081cf',
			'Use Seaskipper with 6 people', 
			'<a href="https://wynncraft.gamepedia.com/V.S.S._Seaskipper">All Docks</a>', 
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur dui sit amet quam elementum, eu hendrerit elit interdum. Ut in fermentum velit.', 
			'200', 
			'42'
		);
	});

L.marker([-345,151], {icon: icon})
	.addTo(map)
	.on('click', (e) => 
	{
		map.panTo(e.latlng);
		SidebarManager.renderTask(
			'https://gamepedia.cursecdn.com/wynncraft_gamepedia_en/3/31/Rymek.png?version=f095cd1f98a9236f0d038f068b918d51',
			'Bandit Movement', 
			'X1300 Z-1700', 
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur dui sit amet quam elementum, eu hendrerit elit interdum. Ut in fermentum velit.', 
			'600', 
			'12'
		);
	});

map.on('click', (e) =>
{ 
	console.log('Clicked on empty spot at: ' + e.latlng);
	SidebarManager.renderList(
		[
			{
				'type': 'mission',
				'name': 'test'
			}
		]
	);
	
});
