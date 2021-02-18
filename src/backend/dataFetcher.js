const { GoogleSpreadsheet } = require('google-spreadsheet');
const Task = require('./task');
const Player = require('./player');
const escape = require('./escape');
const { response } = require('express');

class DataFetcher
{
	async getData()
	{
		let result = { requestedAt: String(+new Date)};
		const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
		doc.useApiKey(process.env.FARPLANE_GOOGLE_KEY);
		await doc.loadInfo(); 

		const playerData = await doc.sheetsByIndex[1].getRows();
		const tasks = await doc.sheetsByIndex[3].getRows();
		result.statistics = {};
		result.tasks = this.praseTasks(tasks);
		result.players = this.praseBasicPlayers(playerData);
		result.players = this.addTaskToPlayers(result.players, playerData, result.tasks);
		result.tasks = this.addStatisticsToTask(result.tasks, result.players);
		result.statistics = this.getOverallStatistics(result.tasks);
		result.players.sort((a, b) => b.experience - a.experience);
		for (let i = 0; i < result.players.length; i++) 
		{
			result.players[i].addRanking(i + 1);
		}
		
      
		return result;
	}
   
	praseTasks(rows)
	{
		const tasks = [];
		for (let i = 0; i < rows.length; i++) 
		{
			const task = rows[i];

			tasks.push(new Task(
				i,
				escape(task.Title),
				escape(task.Coordinates),
				escape(task.Description),
				escape(task['Experience Points']),
				escape(task.Repeatable),
				escape(task.Type),
				task['Interactive Map'] && this.praseCoordinates(task['Interactive Map']),
				task.Images && escape(task.Images).split(' ')
			));
		}
		return tasks;
	}

	praseCoordinates(coordinatesString)
	{
		if(coordinatesString == null)
		{
			return null;
		}
		else
		{
			let result = [];
			const locations = coordinatesString.split('\n');
			for(const location of locations)
			{
				const coordinates = location.split(', ');
				if(coordinates.length == 2)
				{
					result.push(coordinates);
				}
				else
				{
					console.warn('Invalid coordinates: ' + coordinatesString);
					return null;
				}
			}
			return result;
		}
	}

	praseBasicPlayers(playersData)
	{
		let result = [];
		for (let i = 3; i < playersData.length; i++) 
		{
			result.push(new Player(i, escape(playersData[i].name), escape(playersData[i].discord)));
		}
		return result;
	}

	addTaskToPlayers(players, playersData, tasks)
	{
		const result = players;
		const taskNames =  playersData[0]._rawData;
		const validTasksCount = playersData[0]._sheet.headerValues.findIndex((x) => x.includes('taskEnd'));
		if(validTasksCount === -1)
		{
			console.error('Error: validTasksCount is -1');
			return;
		}
		// for each player in player data
		for (let a = 3; a < playersData.length; a++) 
		{
			const playerId = result.findIndex((x) => x.name === escape(playersData[a].name));
			if(playerId === -1) { console.log(`Player ${playerData[a].name} is missing in leaderboard`); continue; }

			// for each task of player
			for (let b = 5; b < validTasksCount; b++) 
			{
				const taskExperience = playersData[a]._rawData[b];
				if(taskExperience && taskExperience.length > 1)
				{
					const taskId = tasks.findIndex((t) => t.name == escape(taskNames[b]));
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

	getOverallStatistics(tasks)
	{
		const result =
		{
			totalMissions: 0,
			totalExcursions: 0,
			totalDares: 0,
		};
		for(const task of tasks)
		{
			if(task.type == 'Mission')
			{
				result.totalMissions++;
			}
			else if(task.type == 'Excursion')
			{
				result.totalExcursions++;
			}
			else if(task.type == 'Dare')
			{
				result.totalDares++;
			}
		}
		return result;
	}
}

module.exports = DataFetcher;
