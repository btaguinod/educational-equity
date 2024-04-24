import { json } from '@sveltejs/kit';
import { GenerateCSVExample, GetXLSXData, StoreXLSXData } from '$lib/caliiforniaDataFetcher';
import type { TablesInsert } from '$lib/database.types.ts';

type AdjustedCohortGraduationRateRaw = {
	AcademicYear: string;
	AggregateLevel: string;
	CountyCode: number;
	DistrictCode: number | undefined;
	SchoolCode: number | undefined;
	CountyName: string;
	DistrictName: string;
	SchoolName: string;
	CharterSchool: string;
	DASS: string;
	ReportingCategory: string;
	CohortStudents: string;
	'Regular HS Diploma Graduates (Count)': string;
	'Regular HS Diploma Graduates (Rate)': string;
	"Met UC/CSU Grad Req's (Count)": string;
	"Met UC/CSU Grad Req's (Rate)": string;
	'Seal of Biliteracy (Count)': string;
	'Seal of Biliteracy (Rate)': string;
	'Golden State Seal Merit Diploma (Count)': string;
	'Golden State Seal Merit Diploma (Rate': string;
	'CHSPE Completer (Count)': string;
	'CHSPE Completer (Rate)': string;
	'Adult Ed. HS Diploma (Count)': string;
	'Adult Ed. HS Diploma (Rate)': string;
	'SPED Certificate (Count)': string;
	'SPED Certificate (Rate)': string;
	'GED Completer (Count)': string;
	'GED Completer (Rate)': string;
	'Other Transfer (Count)': string;
	'Other Transfer (Rate)': string;
	'Dropout (Count)': string;
	'Dropout (Rate)': string;
	'Still Enrolled (Count)': string;
	'Still Enrolled (Rate)': string;
};

export async function POST() {
	console.log('Handling request to retrieve and store data');
	try {
		let rawData = await GetXLSXData<AdjustedCohortGraduationRateRaw>(
			'https://www3.cde.ca.gov/demo-downloads/acgr/acgr23-v2.txt',
			{
				worksheetIndices: [0],
				startRowIndex: 0
			}
		);
		console.log(rawData[0]);
		let data = rawData.map<TablesInsert<'adjusted_cohort_graduation_rate'>>((x) => ({
			academic_year: x.AcademicYear,
			aggregate_level: x.AggregateLevel,
			county_code: parseCountyCode(x.CountyCode),
			district_code: parseDistrictCode(x.DistrictCode),
			school_code: parseSchoolCode(x.SchoolCode),
			county_name: x.CountyName,
			district_name: x.DistrictName,
			school_name: x.SchoolName,
			charter_school: x.CharterSchool,
			dass: x.DASS,
			reporting_category: x.ReportingCategory,
			cohort_students: stringToNumber(x.CohortStudents),
			regular_hs_diploma_graduates: stringToNumber(x['Regular HS Diploma Graduates (Count)']),
			met_uc_csu_grad_reqs: stringToNumber(x["Met UC/CSU Grad Req's (Count)"]),
			seal_of_biliteracy: stringToNumber(x['Seal of Biliteracy (Count)']),
			golden_state_seal_merit_diploma: stringToNumber(x['Golden State Seal Merit Diploma (Count)']),
			chspe_completer: stringToNumber(x['CHSPE Completer (Count)']),
			adult_ed_hs_diploma: stringToNumber(x['Adult Ed. HS Diploma (Count)']),
			sped_certificate: stringToNumber(x['SPED Certificate (Count)']),
			ged_completer: stringToNumber(x['GED Completer (Count)']),
			other_transfer: stringToNumber(x['Other Transfer (Count)']),
			dropout: stringToNumber(x['Dropout (Count)']),
			still_enrolled: stringToNumber(x['Still Enrolled (Count)'])
		}));
		await StoreXLSXData(data, 'adjusted_cohort_graduation_rate');
	} catch (error: any) {
		console.error(`Error: ${JSON.stringify(error)}`);
		return json({ status: 500, ...error });
	}
	return json({ status: 200 });
}

function stringToNumber(x: string): number | null {
	return x === '*' ? null : Number(x);
}

function parseCountyCode(x: number): string {
	return String(x).padStart(2, '0');
}

function parseDistrictCode(x: number | undefined): string {
	if (x === undefined) {
		x = 0;
	}
	return String(x).padStart(5, '0');
}

function parseSchoolCode(x: number | undefined): string {
	if (x === undefined) {
		x = 0;
	}
	return String(x).padStart(7, '0');
}
