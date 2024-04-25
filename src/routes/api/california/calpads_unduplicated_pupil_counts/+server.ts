import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

// TODO: make proper type for allData
export async function GET() {
	console.log('Getting info from calpads_unduplicated_pupil_counts');
	let allData: any[] = [];
	for (let i = 0; ; i += 1000) {
		const { error, data } = await supabase
			.from('calpads_unduplicated_pupil_counts')
			.select(
				'school_name,county_code,district_code,school_code,total_enrollment,free_reduced_meal_program'
			)
			.filter('school_code', 'neq', '0000000')
			.filter('school_code', 'neq', '0000001')
			.range(i, i + 1000);
		if (error != null) {
			throw error;
		}

		for (let i = 0; i < data.length; i++) {
			let totalEnrollment = data[i].total_enrollment;
			let freeReducedMealProgarm = data[i].free_reduced_meal_program;
			if (totalEnrollment === null) {
				throw error;
			}
			if (freeReducedMealProgarm === null) {
				throw error;
			}
			allData.push({
				...data[i],
				free_reduced_meal_program_rate:
					Math.round((freeReducedMealProgarm * 100.0) / totalEnrollment) / 100
			});
		}
		if (data.length < 1000) {
			break;
		}
	}
	return json({ status: 200, count: allData.length, data: allData });
}
