export default class SnackbarManager
{
	show(text)
	{
		const snackbar = document.getElementById('snackbar');
		if(snackbar.className.includes('show')) return;
		snackbar.innerHTML = text;
		snackbar.classList.add('show');
		setTimeout(() => snackbar.classList.remove('show'), 2900);
	}
}
