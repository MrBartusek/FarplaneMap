import DataLoader from './dataLoader.js';

export default class NotificationManager
{
	showEventNotification()
	{
		new DataLoader().loadEventData()
			.then((data) =>
			{
				if(data.available)
				{
					document.getElementById('notification-title').innerHTML = data.title;
					document.getElementById('notification-text').innerHTML = data.message;
					this.updateTimer(data.unix);
					setInterval(() => this.updateTimer(data.unix), 1000);
					setTimeout(() => document.getElementById('notification').style.transform = 'translateY(0)', data.cache ? 1000 : 0);	
					document.getElementById('notification-close').addEventListener('click', () => 
					{
						document.getElementById('notification').style.transform = null;
					});	
				}
			})
			.catch((error) =>
			{
				if(error.error === true)
				{
					console.log(`Event Backend Sent Error: \r\ncode: ${error.code}\r\nmessage: ${error.message}`);
				}
				else
				{
					throw error;
				}
			});
	}
   
	updateTimer(time)
	{
		let delta =  Math.round(time - (new Date().getTime() / 1000));
		if(delta < 0)
		{
			document.getElementById('notification-counter').innerHTML = '<span style="color: #c0392b">⬤</span> LIVE';
			return;
		}
		let hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		let minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		let seconds = delta % 60; 
		if(hours < 10)
		{
			hours = '0' + hours;
		}
		if(minutes < 10)
		{
			minutes = '0' + minutes;
		}
		if(seconds < 10)
		{
			seconds = '0' + seconds;
		}
		document.getElementById('notification-counter').innerHTML = `${hours}:${minutes}:${seconds}`;
	}
}
