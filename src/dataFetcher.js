const { GoogleSpreadsheet } = require('google-spreadsheet');

class DataFetcher
{
	async getData()
	{
		const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
		doc.useApiKey(process.env.FARPLANE_KEY);
		await doc.loadInfo(); 

		let result = { requestedAt: String(+new Date)};
	
		const leaderboard = await doc.sheetsByIndex[0].getRows({offset: 2});
		const playerData = await doc.sheetsByIndex[1].getRows();
		const tasks = await doc.sheetsByIndex[2].getRows();
		result.tasks = this.praseTasks(tasks);
		result.players = this.prasePlayers(leaderboard, playerData, result.tasks);
      
		return result;
	}
   
	praseTasks(rows)
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
				repeatable: task['Repeatable'],
				type: lastType.slice(0,-1), 
				coordinates: task.Coordinates && task.Coordinates.split(' '), 
				image: task.Image, 
			});
		}
		return tasks;
	}

	prasePlayers(leaderboard, playersData, parsedTasks)
	{
		const result = this.praseLeaderboard(leaderboard);

		const taskNames =  playersData[0]._rawData;
		const validTasksCount = playersData[0]._sheet.headerValues.findIndex((x) => x.includes('Old-'));

		for (let i = 3; i < playersData.length; i++) 
		{
			const playerData = playersData[i];
			const leaderboardPlayerId = leaderboard.findIndex((p) => p.name === playerData.name);
			if(leaderboardPlayerId === undefined)
			{
				console.log(`Warning: Found player ${leaderboardPlayerId.name} in "Leaderboard" but not in "Player Data"`);
				continue;
			}

			result[leaderboardPlayerId].completedTasks = [];
		
			for (let i = 2; i < validTasksCount; i++) 
			{
				const taskExperience = playerData._rawData[i];
				if(taskExperience && taskExperience.length > 1)
				{
					const taskId = parsedTasks.findIndex((t) => t.name == taskNames[i]);
					if(taskId != -1)
					{
						result[leaderboardPlayerId].completedTasks.push(taskId);
					}
					else
					{
						console.log(`Warning: Found task ${taskNames[i]} in "Player Data" but not in "Tasks"`);
					}
				}
			}
			playerData.discord = this.prasePlayerDiscord();
		}

		return result;
	}

	praseLeaderboard(leaderboard)
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

	prasePlayerDiscord(id)
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
}

module.exports = DataFetcher;
