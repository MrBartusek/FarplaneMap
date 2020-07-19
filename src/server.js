const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');

const cacheFileDir = __dirname + '\\cache.json';

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
	if(cacheAvailable())
	{
		res.status(200).json({ cache: true, ...JSON.parse(fs.readFileSync(cacheFileDir))});
	}
	else
	{
		const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
		doc.useApiKey(process.env.FARPLANE_KEY);
		await doc.loadInfo(); 

		let result = { requestedAt: String(+new Date)};
	
		const leaderboard = await doc.sheetsByIndex[0].getRows({offset: 2});
		const playerData = await doc.sheetsByIndex[1].getRows();
		const tasks = await doc.sheetsByIndex[2].getRows();
		result.tasks = praseTasks(tasks);
		result.players = prasePlayers(leaderboard, playerData, result.tasks);

		fs.writeFileSync(cacheFileDir, JSON.stringify(result));

		res.status(200).json({ cache: false, ...result});
	}
});

function cacheAvailable()
{
	if(!fs.existsSync(cacheFileDir))
	{
		return false;
	}
	const data = JSON.parse(fs.readFileSync(cacheFileDir ).toString());
	return +new Date - parseInt(data.requestedAt) < 3600000; // One hour in ms
}

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
			type: lastType.slice(0,-1), 
			coordinates: task.Coordinates && task.Coordinates.split(' '), 
			image: task.Image, 
		});
	}
	return tasks;
}

function prasePlayers(leaderboard, playersData, parsedTasks)
{
	result = praseLeaderboard(leaderboard);

	const taskNames =  playersData[0]._rawData;
	const validTasksCount = playersData[0]._sheet.headerValues.findIndex((x) => x.includes('Old-'));

	for (let i = 3; i < playersData.length; i++) 
	{
		const playerData = playersData[i];
		const leaderboardPlayerId = leaderboard.findIndex((p) => p.name === playerData.name);
		if(leaderboardPlayerId === undefined)
		{
			console.error(`Found player ${leaderboardPlayerId.name} in "Leaderboard" but not in "Player Data"`);
			continue;
		}

		result[leaderboardPlayerId].completedTasks = [];
		
		for (let i = 2; i < validTasksCount; i++) 
		{
			const taskExperience = playerData._rawData[i];
			if(taskExperience && taskExperience.length > 1)
			{
				const taskId = parsedTasks.findIndex((t) => t.name == taskNames[i]);
				if(taskId != undefined)
				{
					result[leaderboardPlayerId].completedTasks.push(taskId);
				}
				else
				{
					console.error(`Found task ${taskNames[i]} in "Player Data" but not in "Tasks"`);
				}
			}
		}
		playerData.discord = prasePlayerDiscord();
	}

	return result;
}

function praseLeaderboard(leaderboard)
{
	let players = [];
	for(const player of leaderboard)
	{
		players.push({ 
			name: player.name,
			experience: player.experience
		});
	}
	return players;
}

function prasePlayerDiscord(id)
{
	if(id != '')
	{
		return {
			id: id,
			//TODO: Add username and avatar there
		};
	}
	else
	{
		return null;
	}
}
