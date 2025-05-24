
import Button from '@/components/ui/Button'
export default function ConfigList({ mapNames, setmapData, setconfigNum, mapNameFilter }) {
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
    if (mapNameFilter!=undefined){
        console.log('mapnamefilter not undefined')
        for (let configIndex = 0; configIndex < 156; configIndex++) {
            if (mapNames[configIndex].name.toLowerCase().indexOf(mapNameFilter.toLowerCase()) !== -1) {
                lists.push(
                    <li key={configIndex} id={configIndex}>map number: {configIndex} name: {mapNames[configIndex].name} period: {mapNames[configIndex].period} link: {mapNames[configIndex].mapLink}
                        <Button onClick={configButtonClick} text={"select"} type={"btn btn-success"} />
                    </li>
                );
            }
        }
    }else if (mapNames){
        console.log('map names exists')
        const configIndexList = [8,21,30,34,35,42,44,48, 52, 53, 54, 59, 62,68, 70,72, 85,90,95, 96,108,111, 112,114,115,126,129,131,133,139,140,141,149,150]
        const newLists = [];
        
        for (let configIndex of configIndexList) {
                newLists.push(
                    <li key={configIndex} id={configIndex}> map number: {configIndex} name: {mapNames[configIndex].name} period: {mapNames[configIndex].period} link: {mapNames[configIndex].mapLink}
                        <Button onClick={configButtonClick} text={"select"} type={"btn btn-success"} />
                    </li>
                );
        }

      
        // return ele;
        const newfinalList = 
        <div>
                <p>some of my fav maps:</p>
                <ul>{newLists.map((li) => li)}</ul>

        </div>
        return newfinalList;

    }
    
    
    const finalList = <ul>{lists.map((li) => li)}</ul>
    return finalList;
}