import { json } from '@sveltejs/kit';
import { GetXLSXData, StoreXLSXData } from '$lib/caliiforniaDataFetcher';
import type { TablesInsert } from '$lib/database.types.ts';

interface CalpadsUnduplicatedPupilCountsRaw {
	'Academic Year': string;
	'County Code': string;
	'District Code': string;
	'School Code': string;
	'County Name': string;
	'District Name': string;
	'School Name': string;
	'District Type': string;
	'School Type': string;
	'Educational \nOption Type': string;
	'NSLP \nProvision \nStatus': string;
	'Charter \nSchool \n(Y/N)': string;
	'Charter Number': string;
	'Charter Funding Type': string;
	IRC: string;
	'Low Grade': string;
	'High Grade': string;
	'Total \nEnrollment': number;
	'Free &\nReduced\nMeal\nProgram': number;
	Foster: number;
	'Tribal Foster Youth': number;
	Homeless: number;
	'Migrant\nProgram': number;
	'Direct Certification': number;
	'Unduplicated\nFRPM Eligible \nCount': number;
	'English \nLearner \n(EL)': number;
	'CALPADS Unduplicated \nPupil Count\n(UPC)': number;
	'CALPADS Fall 1 \nCertification Status \n(Y/N)': string;
}

export async function POST() {
	console.log('Handling request to retrieve and store data');
	try {
		let rawData = await GetXLSXData<CalpadsUnduplicatedPupilCountsRaw>(
			'https://www.cde.ca.gov/ds/ad/documents/cupc2223-k12.xlsx',
			{
				worksheetIndices: [1, 2],
				startRowIndex: 1
			}
		);
		let data = rawData.map<TablesInsert<'calpads_unduplicated_pupil_counts'>>((x) => ({
			academic_year: x['Academic Year'],
			calpads_fall_1_certification_status: x['CALPADS Fall 1 \nCertification Status \n(Y/N)'],
			calpads_unduplicated_pupil_count: x['CALPADS Unduplicated \nPupil Count\n(UPC)'],
			charter_funding_type: x['Charter Funding Type'],
			charter_number: x['Charter Number'],
			charter_school: x['Charter \nSchool \n(Y/N)'],
			county_code: x['County Code'],
			county_name: x['County Name'],
			direct_certification: x['Direct Certification'],
			district_code: x['District Code'],
			district_name: x['District Name'],
			district_type: x['District Type'],
			educational_option_type: x['Educational \nOption Type'],
			english_learner: x['English \nLearner \n(EL)'],
			foster: x.Foster,
			free_reduced_meal_program: x['Free &\nReduced\nMeal\nProgram'],
			high_grade: x['High Grade'],
			homeless: x.Homeless,
			irc: x.IRC,
			low_grade: x['Low Grade'],
			migrant_program: x['Migrant\nProgram'],
			nslp_provision_status: x['NSLP \nProvision \nStatus'],
			school_code: x['School Code'],
			school_name: x['School Name'],
			school_type: x['School Type'],
			total_enrollment: x['Total \nEnrollment'],
			tribal_foster_youth: x['Tribal Foster Youth'],
			unduplicated_frpm_eligible_count: x['Unduplicated\nFRPM Eligible \nCount']
		}));
		await StoreXLSXData(data, 'calpads_unduplicated_pupil_counts');
	} catch (error: any) {
		console.error(`Error: ${JSON.stringify(error)}`);
		return json({ status: 500, ...error });
	}
	return json({ status: 200 });
}
