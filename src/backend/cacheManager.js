const fs = require('fs');

class CacheManager
{
	constructor(cacheDirectory, cacheExpire = 3600000)
	{
		this.cacheDirectory = cacheDirectory;
		this.cacheExpire = cacheExpire;
	}

	createCacheDirectory()
	{
		if(!fs.existsSync(this.cacheDirectory)) 
		{ 
			fs.mkdirSync(this.cacheDirectory);
		}
	}
   
	mainCacheAvailable()
	{
		if(process.argv.includes('--no-cache')) return false;
		this.createCacheDirectory();
		if(!fs.existsSync(this.cacheDirectory + '/cache.json')) return false;
		const data = JSON.parse(fs.readFileSync(this.cacheDirectory + '/cache.json').toString());
		return +new Date - parseInt(data.requestedAt) < this.cacheExpire;
	}
   
	getMainCache()
	{
		this.createCacheDirectory();
		return { cache: true, ...JSON.parse(fs.readFileSync(this.cacheDirectory + '/cache.json'))};
	}
   
	saveMainCache(data)
	{
		this.createCacheDirectory();
		fs.writeFileSync(this.cacheDirectory + '/cache.json', JSON.stringify(data));
	}
   
	userCacheAvailable(id)
	{
		if(process.argv.includes('--no-cache')) return false;
		this.createCacheDirectory();
		if(!fs.existsSync(this.cacheDirectory + `/discord_${id}.json`)) return false;
		const data = JSON.parse(fs.readFileSync(this.cacheDirectory + `/discord_${id}.json`).toString());
		return +new Date - parseInt(data.requestedAt) < this.cacheExpire;
	}
   
	getUserCache(id)
	{
		this.createCacheDirectory();
		return { cache: true, ...JSON.parse(fs.readFileSync(this.cacheDirectory + `/discord_${id}.json`))};
	}
   
	saveUserCache(id, data)
	{
		this.createCacheDirectory();
		fs.writeFileSync(this.cacheDirectory + `/discord_${id}.json`, JSON.stringify(data));
	}
}

module.exports = CacheManager;
