export default class DialogManager
{
	showDialog(header, content, buttons, color = 'inherit')
	{
		document.getElementById('dialog').style.display = 'flex';
		document.getElementById('header').innerHTML = header + '<i class="material-icons" onclick="hideDialog()">close</i>';
		document.getElementById('content').innerHTML = content;
		if(color)
		{
			document.getElementById('header').style.backgroundColor = color;
		}
	}
   
	showRanking(players)
	{
		let content = '';
		for (let i = 0; i < players.length; i++) {
			const player = players[i];
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
		this.showDialog('Information', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus viverra ante ac aliquam. Mauris posuere pretium metus, pretium auctor risus. Fusce aliquet, nulla eu venenatis euismod, purus mauris volutpat arcu, eu mattis urna elit eget ante. Phasellus tincidunt in ipsum sit amet facilisis. Curabitur ut hendrerit eros. Mauris sed ex eget eros sagittis fringilla. Morbi tempus nisi tortor, et tincidunt urna feugiat at. Etiam nec pellentesque sem. Donec blandit finibus urna, et maximus nunc feugiat ut. In scelerisque, sapien eu tincidunt ultricies, felis tellus elementum odio, nec facilisis nulla ante nec diam. Suspendisse iaculis arcu et purus lacinia faucibus. <br> <br> Proin eget nunc iaculis, maximus neque eu, luctus augue. Donec eget massa ac diam varius porttitor a a urna. Aliquam risus urna, imperdiet ac orci in, feugiat efficitur tellus. Sed imperdiet, lacus id cursus ultrices, dui felis congue est, sed tempor libero tellus sed libero. Pellentesque placerat luctus dolor. Ut nec nunc quis leo consequat vestibulum sed eget nulla. Curabitur accumsan sollicitudin ipsum, eu feugiat nunc sagittis quis.');
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
   
	hide()
	{
		document.getElementById('dialog').style.display = 'none';
	}
}
