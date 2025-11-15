import Range from '@/components/ui/Range'
export default function InputSize({ min, max, step, value, className , setsize}){
    function handleSizeChange(ele){
        const newSize = ele.target.value;
        setsize(newSize);
    }
    const ele = 
    <div>
        <p>size:</p>
        <Range min={min} max={max} step={step} value={value} onChange={handleSizeChange} className={className} />
    </div>
    return ele
}