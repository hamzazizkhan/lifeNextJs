import { useRef } from "react";

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
        <label> change size: </label>
        <input type="number" placeholder="10" onChange={handleSizeChange}></input>
        <button onClick={sizeButtonClick}> change </button>
    </div>

    return sizeInput
}