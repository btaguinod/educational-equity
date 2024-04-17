import { json } from '@sveltejs/kit'
import { read, utils } from 'xlsx'
import { supabase } from '$lib/supabaseClient'

// TODO: make upsert merge instead of error
// TODO: create table if it doesn't exist
export async function GET() {
    console.log('Fetching sheet')
    let result = await fetch('https://www3.cde.ca.gov/researchfiles/cadashboard/eladownload2023.xlsx')
    console.log('Reading results')
    let resultBuffer = await result.arrayBuffer()
    let resultFile = read(resultBuffer)
    let resultJson = utils.sheet_to_json(resultFile.Sheets[resultFile.SheetNames[0]])
    console.log('Adding to database')
    console.log()
    for (let i = 0; i <= 100; i++) {
        process.stdout.write(`${i}% done\r`)
        let slice_size = resultJson.length / 100
        let array_split = resultJson.slice(i * slice_size, (i + 1) * slice_size)
        const { error } = await supabase
            .from('ela_academic_indicators')
            .upsert(array_split)
        if (error != null) {
            console.error(error.message)
            return json({ 'status': 500, 'error': error.message })
        }
    }
    console.log('Successfuly stored sheet data')
    return json({ 'status': 200 })
}