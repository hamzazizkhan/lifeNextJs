import Button from '@/components/ui/Button'
export default function ColorPicker({ setPointsColor, pointsColor, setChangeColor}){
    function handleColorChange(e){
        console.log("color changed",e.target.value);
        // for (point of points){
        //     point.color = e.target.value;
        // }
        setPointsColor(e.target.value);
        return 
    }

    function changePointColor(e){
        // setPointsColor(e.target.value)
        setChangeColor(true);
    }

    const colorPicker=
    <div>
        <input type="color" id="color-picker" value="#ff0000" onChange={handleColorChange}/> 
        <Button text="pick" type="success" onClick={changePointColor}/>
    </div>
    return colorPicker;
}