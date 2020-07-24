const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const fs = require('fs');
const DataFetcher = require('./dataFetcher');

const cacheFileDir = __dirname + '\\cache.json';

if(!process.env.FARPLANE_KEY)
{
	console.log('Fatal: FARPLANE_KEY not provided');
	process.exit(5);
}

const app = express();
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Farplane map listening at port: ${port}`));

app.get('/get-data', async (req, res) => 
{
	if(cacheAvailable())
	{
		res.status(200).json({ cache: true, ...JSON.parse(fs.readFileSync(cacheFileDir))});
	}
	else
	{
		const result = await new DataFetcher().getData();
		fs.writeFileSync(cacheFileDir, JSON.stringify(result));
		res.status(200).json({ cache: false, ...result});
	}
});

function cacheAvailable()
{
	if(process.argv.includes('--no-cache'))
	{
		return false;
	}
	if(!fs.existsSync(cacheFileDir))
	{
		return false;
	}
	const data = JSON.parse(fs.readFileSync(cacheFileDir ).toString());
	return +new Date - parseInt(data.requestedAt) < 3600000; // One hour in ms
}


