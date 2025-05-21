import Button from '@/components/ui/Button'

import Input from '@/components/ui/Input'
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
            <label> number of iterations: </label>
            <Input type="number" placeholder="200" onChange={handleIterChange} className={"input-ghost-warning input"}/>
            <Button onClick={iterButtonClick} text={"change"} type={"btn btn-warning"}/>
        </div>

    return iterInput
    
}
