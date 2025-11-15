
import Button from '@/components/ui/Button'
export default function FavMaps({mapNames, setmapData,setconfigNum}){

    async function configButtonClick(e) {
        const parELe = e.target.parentElement;
        console.log('clicked mapp button', e.target);
        console.log(parELe.id, '<fetching id');
        const mapID = parELe.id;
        const resp = await fetch(`http://localhost:3000/api/gol/${parELe.id}`).catch((e) => {
            console.error('error in getting map with id', id, 'error:', e);
        });
        const data = await resp.json().catch((e)=>{
            console.error('error in getting json for map', e);
        });
        console.log(data);
        setmapData(data);
        setconfigNum(mapID);
    }

    if (mapNames) {
        console.log('map names in show')
        const configIndexList = [8, 21, 30, 34, 35, 42, 44, 48, 52, 53, 54, 59, 62, 68, 70, 72, 85, 90, 95, 96, 108, 111, 112, 114, 115, 126, 129, 131, 133, 139, 140, 141, 149, 150]
        const newLists = [];

        for (let configindex of configIndexList) {
            newLists.push(
                <li key={configindex} id={configindex}> 
                    <ul id={configindex} className='list-disc'>
                        <div className='flex my-1'>
                            <li id={configindex} className="font-bold"> name:
                                <p className="font-light">{mapNames[configindex].name} </p>
                            </li>
                        </div>
                        <div className='flex my-1 font-bold' >
                            <li id={configindex}>period:
                                <p className="font-light">{mapNames[configindex].period}</p> 
                            </li>
                        </div>
                        <div className='flex my-1'>
                            <li id={configindex} className="font-bold">link: 
                                <p className="font-light"><a href={mapNames[configindex].mapLink} target="_blank">{mapNames[configindex].mapLink} </a></p>
                            </li>
                        </div>
                        <div className='flex my-1'>
                            <li id={configindex} className="font-bold">map number: 
                                <p className="font-light">{configindex}</p>
                            </li>
                        </div>
                        <div className='flex my-1'>
                            <li id={configindex}>
                                 <Button onClick={configButtonClick} text={"select"} type={"btn btn-success"} />
                            </li>
                        </div>
                    </ul>
                </li>
            );
        }


        // return ele;
        const newfinalList =
            <div>
                <p className="text-lg font-bold">MY FAVOURITE MAPS</p>
                <ul>
                    <div className='flex flex-col'>
                        {newLists.map((li) =>(
                            <div key={li.key} className='my-2'>{li}</div>
                            ))}
                    </div> 
                    
                    
                </ul>

            </div>
        return newfinalList;
    }
}