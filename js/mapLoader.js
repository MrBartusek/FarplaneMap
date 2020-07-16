export function loadMap(w,h,url)
{
	var map = L.map('map', {
		zoomDelta: 0.1,
		zoomSnap: 0,
		maxZoom: 3,
		center: [-300,340],
		zoom: 0.3,
		crs: L.CRS.Simple,
	});

	var southWest = map.unproject([0, h], map.getMaxZoom()-1);
	var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
	var bounds = new L.LatLngBounds(southWest, northEast);

	L.imageOverlay(url, bounds).addTo(map);
	map.setMaxBounds(bounds.pad(0.3));
	return map;
}
