import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

// TODO: make proper type for allData
// TODO: find missing schools
export async function GET() {
	let allData: any[] = [];
	for (let i = 0; ; i += 1000) {
		const { error, data } = await supabase
			.from('adjusted_cohort_graduation_rate')
			.select(
				'school_name,county_code,district_code,school_code,cohort_students,regular_hs_diploma_graduates'
			)
			.filter('aggregate_level', 'eq', 'S')
			.filter('reporting_category', 'eq', 'TA')
			.not('cohort_students', 'is', null)
			.not('regular_hs_diploma_graduates', 'is', null)
			.range(i, i + 1000);
		// .filter('charter_school', 'eq', 'All')
		// .filter('dass', 'eq', 'All');
		if (error != null) {
			throw error;
		}

		for (let i = 0; i < data.length; i++) {
			let cohortStudents = data[i].cohort_students;
			let regularHsDiplomaGraduates = data[i].regular_hs_diploma_graduates;
			if (cohortStudents === null) {
				throw error;
			}
			if (regularHsDiplomaGraduates === null) {
				throw error;
			}
			allData.push({
				...data[i],
				regular_hs_diploma_graduates_rate:
					Math.round((regularHsDiplomaGraduates * 1000.0) / cohortStudents) / 1000
			});
		}
		if (data.length < 1000) {
			break;
		}
	}
	return json({ status: 200, count: allData.length, data: allData });
}
