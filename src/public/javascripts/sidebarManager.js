export default class SidebarManager
{
	static renderList(tasks)
	{
		let tasksList = '';
		for(const task of tasks)
		{
			let result = '<div class="sidebar-section-list sidebar-task">';
			if(task.type == 'excursion')
			{
				result += `<i class="material-icons">directions_walk</i> ${task.name}</div>`;
			}
			else if(task.type == 'mission')
			{
				result += `<i class="material-icons">assignment</i> ${task.name}</div>`;
			}
			else if(task.type == 'dare')
			{
				result += `<i class="material-icons">local_fire_department</i> ${task.name}</div>`;
			}
			result += '</div>';
			tasksList += result;
		}
		document.getElementById('sidebar').innerHTML = `
		<div class="sidebar-header">
			<img src="/images/logo192.png" class="sidebar-header-logo"></img>
		</div>
		<div class="sidebar-section">
			social thingies
		</div>
		<div class="sidebar-section">
         ${tasksList}
      </div>
		`;
	}

	static renderTask(image, name, smallText, description, prize, playersPercentage)
	{
		document.getElementById('sidebar').innerHTML = `
      <div class="sidebar-cover" style="background-image: url(${image});"></div>
      <div class="sidebar-section sidebar-title-section">
         ${name}
         <small>${smallText}</small>
      </div>
      <div class="sidebar-section">${description}</div>
      <div class="sidebar-section">
         <div class="sidebar-section-list"><i class="material-icons">star</i> Prize: ${prize}EP</div>
         <div class="sidebar-section-list"><i class="material-icons">people</i> Completed by ${playersPercentage}% of players</div>
      </div>`;
	}
   
	static clear()
	{
		document.getElementById('sidebar').innerHTML = '';
	}
}
