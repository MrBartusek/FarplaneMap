const { GoogleSpreadsheet } = require('google-spreadsheet');
const Task = require('./task');
const Player = require('./player');
const moment = require('moment-timezone');

class EventFetcher
{
	async getEvent()
	{
		let result = { requestedAt: String(+new Date) };
		const doc = new GoogleSpreadsheet('1hyzbaOZVq0dD_AAYnY1q24_mF52u-nYM4BteGAtqZcc');
		doc.useApiKey(process.env.FARPLANE_GOOGLE_KEY);
		await doc.loadInfo(); 

		const events = await doc.sheetsByIndex[3].getRows();
		for(const event of events)
		{
			if(event.Status == '')
			{
				const date = moment.tz(event.Date, 'America/New_York');
				const remainingSeconds = date.diff(moment(), 'seconds') < 0;
				const inProgress = moment.tz(event.Date, 'America/New_York');
				if(remainingSeconds > 60 * 60 * 24 * 2) continue;
				return {
					available: true,
					unix: moment.tz(event.Date, 'America/New_York').unix(),
					title: event['Title Override'] ? event['Title Override'] : 'Farplane Event ' + event.Event,
					message: event['Message Override'] ? event['Message Override'] : 
						(inProgress ? 'Join us on the ongoing event!' : 'Join us on incoming event!'),
					ongoing: inProgress
				};
			}
		}
		return { available: false };
	}
}

module.exports = EventFetcher;
