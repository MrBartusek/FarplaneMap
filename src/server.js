const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
if(!process.env.FARPLANE_KEY)
{
	// eslint-disable-next-line
	console.log('Fatal: FARPLANE_KEY not provided')
	process.exit(5);
}
app.listen(port, () => console.log(`Farplane map listening at port: ${port}`));

app.get('/get-data', async (req, res) => 
{
	const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
	doc.useApiKey(process.env.FARPLANE_KEY);
	await doc.loadInfo(); 

	let result = { requestedAt: +new Date};
	
	const tasks = await doc.sheetsByIndex[2].getRows();
	console.log(playerStats[0]);
	result.tasks = await praseTasks(tasks);
	res.json(result);
});

function praseTasks(rows)
{
	const tasks = [];
	let lastType = 'Unknown';
	for(const task of rows)
	{
		if(task.Type != '' && lastType != task.Type)
		{
			lastType = task.Type;
		}
		tasks.push({ 
			name: task.Title,
			description: task.Description,
			details: task.Details,
			experience: task['Experience Points'],
			type: lastType, 
			coordinates: task.Coordinates, 
			image: task.Image, 
		});
	}
	return tasks;
}
