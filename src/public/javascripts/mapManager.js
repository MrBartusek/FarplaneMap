export default class MapManager
{
	constructor(w, h, url)
	{
		const map = L.map('map', {
			zoomDelta: 0.5,
			zoomSnap: 0,
			maxZoom: 3,
			center: [-300,340],
			zoom: 0.7,
			crs: L.CRS.Simple,
		});
	
		var southWest = map.unproject([0, h], map.getMaxZoom()-1);
		var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
		var bounds = new L.LatLngBounds(southWest, northEast);
	
		L.imageOverlay(url, bounds).addTo(map);
		map.setMaxBounds(bounds.pad(0.3));
		this.map = map;
		this.center();
	}

	addPinpoint(coordinates)
	{
		const icon = L.icon({
			iconUrl: 'images/book.png',
			iconSize: [32, 32]
		});
		return L.marker(coordinates, {icon: icon})
			.addTo(this.map);
	}

	center()
	{
		this.setView([-186, 334], false);
	}

	setView(coordinates, closeZoom)
	{
		this.map.setView(coordinates, closeZoom ? 2 : 0.5);
	}
}

