export default function IterButton({setnumIterChange, iterChangeInput, setiterChangeInput}) {
    function handleIterChange(e){
        const iterChange = e.target.value;
        setiterChangeInput(iterChange);
    }
    
    function iterButtonClick() {
        // console.log('iter button clicked', newIter);
        const numIter = iterChangeInput;
        setnumIterChange(numIter);
    }
    const iterInput =
        <div>
            <label> change number of iterations: </label>
            <input type="number" placeholder="1" onChange={handleIterChange}></input>
            <button onClick={iterButtonClick}> change </button>
        </div>

    return iterInput
    
}
