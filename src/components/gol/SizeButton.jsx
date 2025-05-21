import { useRef } from "react";

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
export default function SizeButton({setsize, setsizeChange, sizeChange}) {
    function handleSizeChange(e) {
        console.log('size change!');
        console.log(e.target.value);

        const newSize = e.target.value;
        setsizeChange(newSize);
    } 
    function sizeButtonClick(e) {
        console.log('size Button clicked!');
        const newSize = sizeChange;
        setsize(newSize);
    }

    const sizeInput = 
    <div>
        <label>size: </label>
        <Input type="number" className={"input-ghost-warning input"} placeholder="10" onChange={handleSizeChange} />
        <Button onClick={sizeButtonClick} text={"change"} type={"btn btn-warning"} />
    </div>

    return sizeInput
}