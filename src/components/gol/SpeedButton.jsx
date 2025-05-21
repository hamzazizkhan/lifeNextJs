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
                <label> change speed: </label>
                <input type="number" placeholder="1" onChange={handleSpeedChange}></input>
                <button onClick={speedButtonClick}> change </button>
            </div>

        return speedInput  
}

