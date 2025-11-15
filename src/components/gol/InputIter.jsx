import Range from '@/components/ui/Range'
export default function InputIter({ min, max, step, value, className, setIter }) {
    function handleIterChange(ele) {
        const newIter = ele.target.value;
        setIter(newIter);
    }
    const ele =
        <div>
            <p>Iterations (short to long):</p>
            <Range min={min} max={max} step={step} value={value} onChange={handleIterChange} className={className} />
        </div>
    return ele
}