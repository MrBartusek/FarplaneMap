const { GoogleSpreadsheet } = require('google-spreadsheet');
const Task = require('./task');
const Player = require('./player');

class DataFetcher
{
	async getData()
	{
		let result = { requestedAt: String(+new Date)};
		const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
		doc.useApiKey(process.env.FARPLANE_KEY);
		await doc.loadInfo(); 

		const playerData = await doc.sheetsByIndex[1].getRows();
		const tasks = await doc.sheetsByIndex[2].getRows();
		result.tasks = this.praseTasks(tasks);
		result.players = this.praseBasicPlayers(playerData);
		result.players = this.addTaskToPlayers(result.players, playerData, result.tasks);
		result.players.sort((a, b) => b.experience - a.experience);
		result.tasks = this.addStatisticsToTask(result.tasks, result.players);
      
		return result;
	}
   
	praseTasks(rows)
	{
		const tasks = [];
		let lastType = 'Unknown';
		for (let i = 0; i < rows.length; i++) 
		{
			const task = rows[i];
			if(task.Type != '' && lastType != task.Type)
			{
				lastType = task.Type;
			}

			tasks.push(new Task(
				i,
				task.Title,
				task.Details,
				task.Description,
				task['Experience Points'],
				task.Repeatable,
				lastType.slice(0,-1),
				task.Coordinates && task.Coordinates.split(' '),
				task.Image
			));
		}
		return tasks;
	}

	praseBasicPlayers(playersData)
	{
		let result = [];
		for (let i = 3; i < playersData.length; i++) 
		{
			result.push(new Player(playersData[i].name));
		}
		return result;
	}

	addTaskToPlayers(players, playersData, tasks)
	{
		const result = players;
		const taskNames =  playersData[0]._rawData;
		const validTasksCount = playersData[0]._sheet.headerValues.findIndex((x) => x.includes('Old-'));

		// for each player in player data
		for (let a = 3; a < playersData.length; a++) 
		{
			const playerId = result.findIndex((x) => x.name === playersData[a].name);
			if(playerId === -1) { console.log(`Player ${playerData[a].name} is missing in leaderboard`); continue; }

			// for each task of player
			for (let b = 2; b < validTasksCount; b++) 
			{
				const taskExperience = playersData[a]._rawData[b];
				if(taskExperience && taskExperience.length > 1)
				{
					const taskId = tasks.findIndex((t) => t.name == taskNames[b]);
					if(taskId < 0) 
					{ 
						if(a == 3) console.log(`Task ${taskNames[b]} is missing metadata`);
						continue; 
					}
					result[playerId].addCompletedTask(tasks[taskId]);
				}
			}
		}
		return result;
	}

	addStatisticsToTask(tasks, players)
	{
		const result = tasks;
		for (let i = 0; i < tasks.length; i++) 
		{
			const completedCount = players.filter((x) => x.completedTasks.includes(tasks[i].id)).length;
			result[i].addStatistic(completedCount / tasks.length * 100);
		}
		const popularTasks = [...result].sort((a, b) => { return b.completedPercentage - a.completedPercentage; }).slice(0, 5);
		for(const popularTask of popularTasks)
		{
			result[popularTask.id].setPopular();
		}
		
		return result;

	}
}

module.exports = DataFetcher;
