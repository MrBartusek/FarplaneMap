const icon = L.icon({
	iconUrl: 'book.png',
	iconSize: [32, 32]
});

const map = loadMap(2669,1488,'images/wynnmap.jpeg');

L.marker([-213,188], {icon: icon}).addTo(map)
	.bindPopup('<b>Detlas</b><br> pinpoints not implemented');