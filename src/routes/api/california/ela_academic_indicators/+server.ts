import { json } from '@sveltejs/kit'
import { read } from '$app/server'
import { GetXLSXData, StoreXLSXData, type GetXLSXDataOptions, type StoreXLSXDataOptions } from '$lib/caliiforniaDataFetcher'


export async function POST() {
    console.log('Handling request to retrieve and store data')
    try {
        let data = await GetXLSXData('https://www3.cde.ca.gov/researchfiles/cadashboard/eladownload2023.xlsx', {
            worksheetIndices: [0],
            startRowIndex: 0,
        })
        await StoreXLSXData(data, 'ela_academic_indicators', {
            uniqueColumns: 'schoolname,districtname,countyname,studentgroup'
        })
    } catch (error: any) {
        console.error(`Error: ${JSON.stringify(error)}`)
        return json({ 'status': 500, ...error })
    }

    return json({ 'status': 200 })
}