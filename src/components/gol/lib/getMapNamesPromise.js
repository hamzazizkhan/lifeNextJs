export default async function getMapNamesPromise() {
    const url = 'http://localhost:3000/api/gol/names'
    const req = new Request(url)
    const resp = await fetch(req).catch((e) => {
        console.error('could not get map names', e);
    })
    const mapNames = await resp.json();
    console.log('map names', mapNames)
    return mapNames;
    
}