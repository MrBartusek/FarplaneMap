export default class ChartManager
{
	static progressChart(canvas, color, value, max)
	{
		const chart = new Chart(canvas.getContext('2d'), {
			type: 'horizontalBar',
			data: {
				datasets: [{
					data: [value],
					backgroundColor: color
				}, {
					data: [max - value],
					backgroundColor: '#f2f2f2f2'
				}]
			},
			options: {
				legend: { display: false },
				tooltips: { enabled: false },
				hover: { mode: null },
				scales: {
					xAxes: [{ display: false, stacked: true }],
					yAxes: [{ display: false, stacked: true }]
				}
			}
		});
	}
}
