import { error } from '@sveltejs/kit';
import { Scatter } from 'svelte-chartjs';

// TODO: make types for the returned objects
export async function load({ fetch }) {
	console.log('fetching graduation rate data');
	const graduationRateRes = await fetch('/api/california/adjusted_cohort_graduation_rate');
	const graduationRateData = await graduationRateRes.json();
	console.log('fetching reduced lunch data');
	const reducedLunchRes = await fetch('/api/california/calpads_unduplicated_pupil_counts');
	const reducedLunchData = await reducedLunchRes.json();
	console.log('successfully fetched data');

	// TODO: make this more efficient
	let dataCoords = [];
	for (let x of graduationRateData.data) {
		for (let y of reducedLunchData.data) {
			let matchingSchool = x.school_code === y.school_code;
			let matchingCounty = x.county_code === y.county_code;
			let matchingDistrict = x.district_code === y.district_code;
			if (matchingSchool && matchingCounty && matchingDistrict) {
				dataCoords.push({
					school: x.school_name,
					x: x.regular_hs_diploma_graduates_rate,
					y: y.free_reduced_meal_program_rate
				});
			}
		}
	}
	let data = {
		labels: ['Scatter'],
		datasets: [
			{
				borderColor: 'rgba(99,0,125, .2)',
				backgroundColor: 'rgba(99,0,125, .5)',
				label: 'School',
				data: dataCoords
			}
		]
	};

	return data;
}
