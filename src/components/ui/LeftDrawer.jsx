import SaveSettingsButton from '@/components/gol/SaveSettingsButton'
import InputSize from '@/components/gol/InputSize'
import InputSpeed from '@/components/gol/InputSpeed'
import InputIter from '@/components/gol/InputIter'

export default function LeftDrawer({drawerName, drawerHeading, buttons, setsize, size,sizeChange, setspeed,speed,speedChangeInput, 
    setnumiterChange, numIter, iterChangeInput}){

    return(
        <div>
            <input type="checkbox" id="drawer-left" className="drawer-toggle" />

            <label htmlFor="drawer-left" className="btn btn-primary">{drawerName}</label>
            <label className="overlay" htmlFor="drawer-left"></label>
            <div className="drawer">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label htmlFor="drawer-left" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <div className='flex flex-col'>
                        <div className='my-2'>
                            <h2 className="text-xl font-medium" > {drawerHeading} </h2>
                        </div>
                        <div className='my-2'>

                            <InputSize min={1} max={100} step={2} setsize={setsize} className={"range range-success"} value={size}/>
                        </div>
                        <div className='my-2'>

                            <InputSpeed min={1} max={200} step={2} setspeed={setspeed} className={"range range-success"} value={speed}/>
                        </div>
                        <div className='my-2'>

                            <InputIter min={20} max={1000} step={10} setIter={setnumiterChange} className={"range range-success"} value={numIter}/>
                        </div>

                        {/* <SaveSettingsButton setsize={setsize} sizeChange={sizeChange} setspeed={setspeed} speedChangeInput={speedChangeInput} setnumiterChange={setnumiterChange} iterChangeInput={iterChangeInput} /> */}

                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        {/* <button className="btn btn-ghost">Cancel</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

