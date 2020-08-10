export default class ChartManager
{
	static progressChart(canvas, color, value, max)
	{
		const ctx = canvas.getContext('2d');
		new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				datasets: [{
					data: [(value/max) * 100],
					backgroundColor: color
				}, {
					data: [100 - (value/max) * 100],
					backgroundColor: '#f2f2f2f2'
				}]
			},
			options: {
				responsive: true,
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
