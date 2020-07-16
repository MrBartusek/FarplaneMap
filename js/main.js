import { loadMap } from './mapLoader.js';
import SidebarManager from './sidebarManager.js';

const icon = L.icon({
	iconUrl: 'book.png',
	iconSize: [32, 32]
});

const map = loadMap(2669,1488,'images/wynnmap.jpeg');

L.marker([-213,188], {icon: icon}).addTo(map)
	.bindPopup('<b>Detlas</b><br> pinpoints not implemented');

SidebarManager.renderTask(
	'https://gamepedia.cursecdn.com/wynncraft_gamepedia_en/d/dc/HczgFHG.png?version=bb833f97adf60c4d8361d0cdbe9081cf',
	'Use Seaskipper with 6 people', 
	'<a href="https://wynncraft.gamepedia.com/V.S.S._Seaskipper">All Docks</a>', 
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur dui sit amet quam elementum, eu hendrerit elit interdum. Ut in fermentum velit.', 
	'200', 
	'42'
);
