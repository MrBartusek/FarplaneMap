
export default class SidebarManager
{
	static renderList()
	{
		document.getElementById('sidebar').innerHTML = 'Tasks List';
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
