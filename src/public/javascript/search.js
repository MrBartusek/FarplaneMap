export default function handleSearch()
{
	const search = document.getElementById('search');
	const helpers = document.getElementsByClassName('sidebar-search-helpers')[0].children;
	let completedState = 0;
	let typeState = 0;
	helpers[0].addEventListener('click', (e) => 
	{ 
		completedState++;
		if(completedState == 0)
		{
			helpers[0].classList.remove('active');
			helpers[0].innerHTML = 'Status';
		}
		else if(completedState == 1)
		{
			helpers[0].classList.add('active');
			helpers[0].innerHTML = 'Completed';
		}
		else if(completedState == 2)
		{
			helpers[0].classList.add('active');
			helpers[0].innerHTML = 'Un-Completed';
		}
		else
		{
			helpers[0].classList.remove('active');
			helpers[0].innerHTML = 'Status';
			completedState = 0;
		}
	});
	helpers[1].addEventListener('click', (e) => 
	{ 
		typeState++;
		if(typeState == 0)
		{
			helpers[1].classList.remove('active');
			helpers[1].innerHTML = 'Type';
		}
		else if(typeState == 1)
		{
			helpers[1].classList.add('active');
			helpers[1].innerHTML = 'Event';
		}
		else if(typeState == 2)
		{
			helpers[1].classList.add('active');
			helpers[1].innerHTML = 'No Event';
		}
		else
		{
			helpers[1].classList.remove('active');
			helpers[1].innerHTML = 'Type';
			typeState = 0;
		}
	});
}

