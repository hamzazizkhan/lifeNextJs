import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';

export async function GET(req,{params}) {
    const id = (await params).id;

    const data = await fs.readFile(process.cwd()+'/src/app/api/gol/[id]/nameMapPairs.json');
    const maps = JSON.parse(data);
    // console.log(maps[id]);
    const returnMap = maps[id];

    return new Response(JSON.stringify(returnMap), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
