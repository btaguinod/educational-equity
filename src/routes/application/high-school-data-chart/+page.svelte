<script lang="ts">
	import { Scatter } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement
	} from 'chart.js';
	Chart.register(
		Title,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement
	);
	export let data;
	let options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (ctx: any) {
						return `${ctx.raw.school}: Grad -  ${ctx.parsed.x}%,Reduced Meal - ${ctx.parsed.y}%`;
					}
				}
			}
		},
		scales: {
			x: {
				ticks: {
					format: {
						style: 'percent'
					}
				},
				title: {
					display: true,
					text: 'Graduation Rate'
				}
			},
			y: {
				ticks: {
					format: {
						style: 'percent'
					}
				},
				title: {
					display: true,
					text: 'Reduced Lunch Ratio'
				}
			}
		},
		responsive: true
	};
</script>

<div
	class="card h-2/3 w-3/5 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"
>
	<h1>High School Data Chart</h1>
	<Scatter {data} {options} />
</div>
