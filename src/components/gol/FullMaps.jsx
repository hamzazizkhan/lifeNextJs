
import Button from '@/components/ui/Button'
export default function FullMaps({ mapNames, setmapData, setconfigNum, filterValue}){
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

    console.log("filter vALue in full maps");
    console.log(filterValue)
    
    const newLists = []
    for (let configindex = 0; configindex < 156; configindex++) {
        newLists.push(
                <li key={configindex} id={configindex}> 
                    <ul id={configindex} className='list-disc'>
                        <div className='flex my-1'>
                            <li id={configindex} className="font-bold"> name:
                                <p className="font-light">{mapNames[configindex].name} </p>
                            </li>
                        </div>
                        <div className='flex my-1 font-bold'>
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
                            <li id={configindex}className="font-bold">map number: 
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
    const finalList = 
    <div>
        <p className="text-lg font-bold">ALL MAPS</p>
        <ul>
            <div className='flex flex-col'>
            {newLists.map((li) => (
                <div className='my-2' key={li.key}>{li}</div>
            ))}
            </div> 
        </ul>
    </div>
    return finalList;
}