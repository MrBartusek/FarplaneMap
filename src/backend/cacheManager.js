const fs = require('fs');

class CacheManager
{
	constructor(cacheDirectory, cacheExpire = 3600000)
	{
		this.cacheDirectory = cacheDirectory;
		this.cacheExpire = cacheExpire;
	}
   
	mainCacheAvailable()
	{
		if(process.argv.includes('--no-cache'))
		{
			return false;
		}
		if(!fs.existsSync(this.cacheDirectory + '/cache.json'))
		{
			return false;
		}
		const data = JSON.parse(fs.readFileSync(this.cacheDirectory + '/cache.json').toString());
		return +new Date - parseInt(data.requestedAt) < this.cacheExpire;
	}
   
	getMainCache()
	{
		return { cache: true, ...JSON.parse(fs.readFileSync(this.cacheDirectory + '/cache.json'))};
	}
   
	saveMainCache(data)
	{
		fs.writeFileSync(this.cacheDirectory + '/cache.json', JSON.stringify(data));
	}
}

module.exports = CacheManager;
