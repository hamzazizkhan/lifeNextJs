
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
export default function SpeedButton({   setspeedChangeInput, speedChangeInput, setspeed}) {
    function handleSpeedChange(e){
        const newSpeed = e.target.value;
        setspeedChangeInput(newSpeed); 
    }
    function speedButtonClick() {
        // console.log('speed button clicked', newSpeed);
        const speed = speedChangeInput;
        setspeed(speed);
    }
    const speedInput =
            <div>
                <label>speed: </label>
                <Input type="number" className={"input-ghost-warning input"} placeholder="100" onChange={handleSpeedChange}/>
                {/* <Bsetsize,sizeChange, setspeed,speedChangeInput, setnumiterChange, iterChangeInputButton onClick={speedButtonClick} text={"change"} type={"btn btn-warning"} /> */}
            </div>

        return speedInput  
}

