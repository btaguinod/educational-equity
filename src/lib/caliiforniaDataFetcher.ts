import { read, utils } from 'xlsx'
import { supabase } from '$lib/supabaseClient'
import { json } from '@sveltejs/kit'

async function GetXLSXData<T>(url: string): Promise<T[]> {
    let result = await fetch(url)
    let resultBuffer = await result.arrayBuffer()
    let resultFile = read(resultBuffer)
    return utils.sheet_to_json(resultFile.Sheets[resultFile.SheetNames[0]])
}

async function StoreXLSXData<T>(data: T[]) {
    console.log()
    for (let i = 0; i <= 100; i++) {
        process.stdout.write(`${i}% done\r`)
        let slice_size = data.length / 100
        let array_split = data.slice(i * slice_size, (i + 1) * slice_size)
        const { error } = await supabase
            .from('ela_academic_indicators')
            .upsert(array_split)

        if (error != null) {
            console.error(error.message)
            throw error
        }
    }
}