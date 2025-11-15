import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import ConfigList from '@/components/gol/ConfigList'
import FullMaps from '@/components/gol/FullMaps'
import FavMaps from '@/components/gol/FavMaps'
import MapSearch from '@/components/gol/MapSearch'
import { useEffect } from 'react'
export default function RightDrawer({ drawerName, drawerHeading, setMapSearchValue, mapNames, setmapData, setconfigNum, mapNameFilter, showFullMaps, setShowFullMaps, 
    displayMapSearchValues, setDisplayMapSearchValues, showFavMaps, setShowFavMaps , setFilterValue, filterValue }){

    // useEffect(()=>{

    // },[filterValue])

    function handleMapSearchChange(e){
        const serachValue = e.target.value
        setMapSearchValue(serachValue);
        console.log('map search value changed to', serachValue);
        if(serachValue.length===0){
            setDisplayMapSearchValues(false);
            setShowFullMaps(false);
            setShowFavMaps(true);
        }else{
            setDisplayMapSearchValues(true);
            setShowFavMaps(false);
            setShowFullMaps(false);
        }
    }
    // const val = mapNameFilter.toLowerCase();
    
    function showAllMapsButton(){
        setShowFullMaps(true);
        setShowFavMaps(false);
        setDisplayMapSearchValues(false);
        console.log(showFullMaps, ' show full mpas in right drawer');
    }

    function showFavMapsButton() {
        setShowFavMaps(true);
        setShowFullMaps(false);
        setDisplayMapSearchValues(false);
        console.log(showFavMaps, ' show fav mpas in right drawer');
    }

    console.log("filter value in right drawer");
    console.log(filterValue);
    return(
        <div>
            <input type="checkbox" id="drawer-right" className="drawer-toggle" />

            <label htmlFor="drawer-right" className="btn btn-primary"> {drawerName} </label>
            <label className="overlay" htmlFor="drawer-right"></label>
            <div className="drawer drawer-right">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <div className="flex flex-col">
                        <div className='my-2'>
                            <h2 className="text-xl font-medium">{drawerHeading}</h2>
                        </div>
                        <div className='my-2'>
                            <input className="input py-1.5 my-3" placeholder="Type map name here..." onChange={handleMapSearchChange} />
                        </div>
                        <div className='my-2'>
                            <Button type={"btn btn-primary"} text={'show all maps'} onClick={showAllMapsButton} />
                        </div>
                        <div className='my-2'>
                            <Button type={"btn btn-primary"} text={'show fav maps'} onClick={showFavMapsButton} />
                        </div>
                        <div>
                            <Dropdown buttonName={"filters"} dropdownValues={["period", "velocity"]} setFilterValue={setFilterValue}/>
                        </div>
                        <div className='my-2'>
                            {showFullMaps && <FullMaps mapNames={mapNames} setmapData={setmapData} setconfigNum={setconfigNum} filterValue={filterValue}/>}
                            {showFavMaps && <FavMaps mapNames={mapNames} setmapData={setmapData} setconfigNum={setconfigNum} />}
                            {displayMapSearchValues && <MapSearch mapNames={mapNames} setmapData={setmapData} setconfigNum={setconfigNum} mapNameFilter={mapNameFilter} />}
                        </div>
                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        {/* <button className="btn btn-ghost">Cancel</button>
                        <button className="btn btn-primary">Save</button> */}
                    </div>
                </div>
            </div>


        </div>       
    )
}