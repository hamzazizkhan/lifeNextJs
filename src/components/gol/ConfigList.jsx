
import Button from '@/components/ui/Button'
export default function ConfigList({ mapNames, setmapData, setconfigNum }) {
    async function configButtonClick(e) {

        const parELe = e.target.parentElement;
        console.log('clicked mapp button', e.target.parentElement);
        console.log(parELe.id, '<fetching id');
        const mapID = parELe.id;
        const resp = await fetch(`http://localhost:3000/api/gol/${parELe.id}`).catch((e) => {
            console.error('error in getting map with id', id, 'error:', e);
        });
        const data = await resp.json();
        console.log(data);
        setmapData(data);
        setconfigNum(mapID);
    }
    //156 index configs

    const lists = [];
    for (let configIndex = 0; configIndex < 156; configIndex++) {
        lists.push(
            <li key={configIndex} id={configIndex}>map number: {configIndex} name: {mapNames[configIndex].name} period: {mapNames[configIndex].period} link: {mapNames[configIndex].mapLink}
                <Button onClick={configButtonClick} text={"select"} type={"btn btn-success"} />
            </li>


        );
    }
    const finalList = <ul>{lists.map((li) => li)}</ul>
    return finalList;
}