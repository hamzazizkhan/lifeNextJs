import ConfigList from '@/components/gol/ConfigList'
export default function ({ drawerName, drawerHeading, setMapSearchValue, mapNames, setmapData, setconfigNum, mapNameFilter }){
    function handleMapSearchChange(e){
        const serachValue = e.target.value
        setMapSearchValue(serachValue);
        console.log('map search value changed to', serachValue);
    }
    // const val = mapNameFilter.toLowerCase();
    console.log('value of map name filter in Right drawer in lower case', mapNameFilter);

    return(
        <div>
            <input type="checkbox" id="drawer-right" className="drawer-toggle" />

            <label htmlFor="drawer-right" className="btn btn-primary"> {drawerName} </label>
            <label className="overlay" htmlFor="drawer-right"></label>
            <div className="drawer drawer-right">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <div>
                        <h2 className="text-xl font-medium">{drawerHeading}</h2>
                        <input className="input py-1.5 my-3" placeholder="Type map name here..." onChange = {handleMapSearchChange} />
                        <ConfigList mapNames={mapNames} setmapData={setmapData} setconfigNum={setconfigNum} mapNameFilter={mapNameFilter} />
                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        <button className="btn btn-ghost">Cancel</button>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>


        </div>       
    )
}