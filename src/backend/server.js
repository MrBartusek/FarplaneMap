const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const fs = require('fs');
const DataFetcher = require('./dataFetcher');
const CacheManager = require('./cacheManager');
if(!process.env.FARPLANE_GOOGLE_KEY | !process.env.FARPLANE_DISCORD_KEY)
{
	console.log('Fatal: FARPLANE_GOOGLE_KEY or FARPLANE_DISCORD_KEY not provided');
	process.exit(5);
}

const cacheManager = new CacheManager(__dirname + '/cache');

const app = express();
app.use(logger('dev'));

app.use('/', express.static(path.join(path.resolve('src/public'))));
app.get('/task/', (req, res) => res.redirect('/'));
app.get('/task/*', (req, res) => res.status(200).sendFile(path.resolve('src/public/index.html')));
app.get('/501', (req, res) => res.status(501).sendFile(path.resolve('src/public/501.html')));

app.get('/get-data', async (req, res) => 
{
	if(cacheManager.mainCacheAvailable())
	{
		res.status(200).json(cacheManager.getMainCache());
	}
	else
	{
		try 
		{
			const result = await new DataFetcher().getData();
			cacheManager.saveMainCache(result);
			res.status(200).json({ cache: false, ...result});
		} 
		catch (error) 
		{
			console.log('Failed to get data: ' + error.stack);
			res.status(500).json(
				{
					error: true,
					message: 'Internal Server Error',
					code: 500,
				}
			);
		}
	}
});

app.use((req, res) => res.status(404).sendFile(path.resolve('src/public/404.html')));
app.listen(port, () => console.log(`Farplane map listening at port: ${port}`));
