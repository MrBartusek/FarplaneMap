export default class DataLoader
{
	static loadData()
	{
		console.log('Loading tasks from /get-data...');
		return fetch('/get-data')
			.then(response => response.json())
			.then(data => 
			{
				if(data.error)
				{
					return Promise.reject(data);
				}
				const requestedAgo = Math.round((+new Date - parseInt(data.requestedAt)) / 1000);
				console.log(data.cache ? 
					`Got cached data from ${requestedAgo} seconds ago` : 
					`Got fresh data from ${requestedAgo} seconds ago`); 
				return data;
			});
	}
}
