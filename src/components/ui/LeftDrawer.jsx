import SaveSettingsButton from '@/components/gol/SaveSettingsButton'
export default function LeftDrawer({drawerName, drawerHeading, buttons, setsize,sizeChange, setspeed,speedChangeInput, setnumiterChange, iterChangeInput}){

    return(
        <div>
            <input type="checkbox" id="drawer-left" className="drawer-toggle" />

            <label htmlFor="drawer-left" className="btn btn-primary">{drawerName}</label>
            <label className="overlay" htmlFor="drawer-left"></label>
            <div className="drawer">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label htmlFor="drawer-left" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <div>
                        <h2 text-xl font-medium> {drawerHeading} </h2>
                        {/* <input className="input py-1.5 my-3" placeholder="Type here..." /> */}
                        {buttons.map((but) => but)}
                        <SaveSettingsButton setsize={setsize} sizeChange={sizeChange} setspeed={setspeed} speedChangeInput={speedChangeInput} setnumiterChange={setnumiterChange} iterChangeInput={iterChangeInput} />

                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        {/* <button className="btn btn-ghost">Cancel</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

