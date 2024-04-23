import XLSX from 'xlsx';
import { read } from '$app/server';
import { supabase } from '$lib/supabaseClient';
import type { TablesInsert, Tables } from '$lib/database.types';

export interface GetXLSXDataOptions {
	worksheetIndices: number[];
	startRowIndex: number;
}

export interface StoreXLSXDataOptions {
	uniqueColumns: string;
}

export async function GetXLSXData<T>(url: string, options: GetXLSXDataOptions): Promise<T[]> {
	console.log(`Fetching data from ${url}`);
	let fetchData;
	if (url.startsWith('http')) {
		fetchData = await fetch(url);
	} else {
		fetchData = read(url);
	}

	console.log('Reading data');
	let dataBuffer = await fetchData.arrayBuffer();
	let workbook = XLSX.read(dataBuffer);
	let result: T[] = [];
	for (let worksheetIndex of options.worksheetIndices) {
		let sheetName = workbook.SheetNames[worksheetIndex];
		console.log(`Reading sheet ${sheetName}`);
		let worksheet = workbook.Sheets[sheetName];
		let range = XLSX.utils.decode_range(worksheet['!ref'] || '');
		range.s.r = options.startRowIndex;
		worksheet['!ref'] = XLSX.utils.encode_range(range);
		result = [...result, ...XLSX.utils.sheet_to_json<T>(worksheet)];
	}

	console.log(`Successfully fetched and read data. First item: ${JSON.stringify(result[365])}`);

	return result;
}

// TODO: find a way to remove "any" and put the actual type options
export async function StoreXLSXData(
	entries: any[],
	tableName: any,
	options?: StoreXLSXDataOptions
) {
	console.log(`Storing data in table ${tableName}`);
	for (let i = 0; i <= 100; i++) {
		process.stdout.write(`${i}% done\r`);
		let sliceSize = entries.length / 100;
		let arraySplit = entries.slice(i * sliceSize, (i + 1) * sliceSize);
		let queryOptions;
		if (options != undefined) {
			queryOptions = { onConflict: options?.uniqueColumns };
		}
		const { error } = await supabase.from(tableName).insert(arraySplit);
		if (error != null) {
			throw error;
		}
	}

	console.log(`Successfully stored data in table ${tableName}`);
}

export function GenerateCSVExample<T>(entry: T) {
	let newKeys: string[] = [];
	let newValues = [];
	for (let key in entry) {
		let newKey: string = key;
		if (newKey.indexOf('(') != -1) {
			newKey = newKey.substring(0, newKey.indexOf('('));
		}
		newKey = newKey.replaceAll(/([a-z])([A-Z])/g, '$1_$2');
		newKey = newKey.replaceAll('.', '');
		newKey = newKey.replaceAll("'", '');
		newKey = newKey.replaceAll('/', '_');
		newKey = newKey.replaceAll('\n', ' ');
		newKey = newKey.trim();
		newKey = newKey.replaceAll('&', '');
		newKey = newKey.replaceAll(' ', '_');
		newKey = newKey.replaceAll('__', '_');
		newKey = newKey.toLowerCase();
		if (!newKeys.includes(newKey)) {
			newKeys.push(newKey);
			if (typeof entry[key] === 'string') {
				newValues.push('string');
			} else if (typeof entry[key] === 'number') {
				newValues.push(10);
			} else {
				throw 'WHat';
			}
		}
	}
	console.log();
	console.log(newKeys.join(','));
	console.log(newValues.join(','));
}
