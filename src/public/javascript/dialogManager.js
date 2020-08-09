export default class DialogManager
{
	constructor(ranking, shareManager)
	{
		this.ranking = ranking;
		this.shareManager = shareManager;
		const dialog = document.getElementById('dialog');
		window.addEventListener('click', () =>
		{
			if(event.target == dialog)
			{
				this.hide();
			}
		});
	}
	showDialog(header, content, color, center)
	{
		document.getElementById('dialog').style.display = 'flex';
		setTimeout(() =>
		{
			document.getElementById('dialog').style.opacity = 1;
		}, 1);
		
		document.getElementById('header').innerHTML = header + '<i class="material-icons" id="dialog-close">close</i>';
		document.getElementById('dialog-close').addEventListener('click', () => this.hide());
		document.getElementById('content').innerHTML = content;
		document.getElementById('header').style.backgroundColor = color || null;
		if(center)
		{
			document.getElementById('dialog-surface').classList.add('dialog-center');
		}
		else
		{document.getElementById('dialog-surface').classList.remove('dialog-center');}
	}
   
	showRanking()
	{
		let content = '';
		for (let i = 0; i < this.ranking.length; i++) {
			const player = this.ranking[i];
			content += `
         <div class="dialog-ranking-item">
            <span class="dialog-ranking-place">#${i+1}</span>
            <span class="dialog-ranking-name">${player.name}</span>
            <span class="dialog-ranking-experience">${player.experience}</span>
         </div>`;
		}
		this.showDialog('Ranking', content);
	}
   
	showHelp()
	{
		this.showDialog('Welcome to Excursion!', `
			<div id="content" class="dialog-content">
            <h2 style="margin-top: 0;">What is Excursion?</h2>
            <p>
               Excursion is a bucketlist of tasks any wynncraft player can complete and have fun with or explore the map and do
               all sorts of wild things that put your imagination to the test. As well, there is our leaderboards where players can 
               compete over each other for who has the most experience points earned from these tasks and who has completed most tasks too.
            </p><p>
               Through Excursion, our community makes of Wynncraft a sandbox experience; the tasks include one moment driving boats drunk,
               the other waiting half an hour for a mob to spawn and going crazy over it.
‍            </p>
            <h2>How do you devide tasks?</h2>
            <div class="dialog-task-row">
               <div class="dialog-task-col">
                  <div class="dialog-task-header icon-mission">
                     <i class="material-icons">assignment</i><b>Missions</b>
                  </div>
                  <p>
                     Activities related to items, mobs or gameplay from Wynncraft.
                  </p>
               </div>
               <div class="dialog-task-col">
                  <div class="dialog-task-header icon-excursion">
                     <i class="material-icons">directions_walk</i><b>Excursions</b>
                  </div>
                  <p>
                     Sandbox activities that involve exploring the Wynncraft world, socializing
                     with other players, and other creative ways to have fun in its open world.
                  </p>
               </div>
               <div class="dialog-task-col">
                  <div class="dialog-task-header icon-dare">
                     <i class="material-icons">local_fire_department</i><b>Dares</b>
                  </div>
                  <p>
                     Missions and excursions of a higher difficulty.
                  </p>
               </div>
            </div>

            <div class="dialog-task-row">
               <div class="dialog-task-col">
                  <div class="dialog-task-header" style="color: #2c3e50;">
                     <i class="material-icons">sync_disabled</i><b>Normal Tasks</b>
                  </div>
                  <p>
                     You can do these tasks only one time.
                  </p>
               </div>
               <div class="dialog-task-col">
                  <div class="dialog-task-header" style="color: #2980b9">
                     <i class="material-icons">cached</i><b>Repeatable Tasks</b>
                  </div>
                  <p>
                     These task can be resubmitted every time you find the amount required of new locations or items on the list.
                  </p>
               </div>
               <div class="dialog-task-col">
                  <div class="dialog-task-header" style="color: #f39c12">
                     <i class="material-icons">event</i><b>Event Tasks</b>
                  </div>
                  <p>
                     Event tasks can be resubmitted each Farplane Event. Each event is announced on the Discord.
                  </p>
               </div>
            </div>
            <h2>How do I join?</h2>
            <p>
               Join our Discord if it sparks that adventurer within you and explore Wynncraft in a way you haven't before. 
               Go ahead find some non-event task and subbmit it to our bot Yin. If you need help press <b>Submit</b> button in the task view.
            </p>
            <a class="dialog-discord-button" href="https://discord.gg/vUn6dVa" target='_blank' rel="noopener noreferrer">Begging your Adventure</a>
         </div>
		`,undefined,true);
	}

	submittingTaskHelp(name, color)
	{
		this.showDialog(
			'Submitting Evidence', 
			'After completing this task you can submit it our discord server on evidence channel. <br><br>' + 
			`When you attach evidence to message: <pre>y!submit ${name}</pre>` +
			`When you attach evidence as link: <pre>y!submit ${name} [link]</pre>` +
			`When you done task with couple of people: <pre>y!submit ${name} [mentions of players]</pre>`
			, color);
	}

	shareTask(id, type, color)
	{
		this.showDialog('Share Task', `You can share this ${type} by copping link below: <pre class="share-link">${this.shareManager.createUrl(id)}</pre>`, color);
	}
   
	hide()
	{
		document.getElementById('dialog').style.opacity = 0;
		setTimeout(() =>
		{
			document.getElementById('dialog').style.display = 'none';
		}, 100);
		
	}
}
