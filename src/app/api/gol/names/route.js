import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';

export async function GET(req, { params }) {

    const data = await fs.readFile(process.cwd() + '/src/app/api/gol/names/names.json');
    const mapNames = JSON.parse(data);
    // console.log(maps[id]);
    

    return new Response(JSON.stringify(mapNames), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
