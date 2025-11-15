import Range from '@/components/ui/Range'
export default function InputSpeed({ min, max, step, value, className, setspeed}) {
    function handleSpeedChange(ele) {
        const newSpeed= ele.target.value;
        setspeed(newSpeed);
    }
    const ele =
        <div>
            <p>speed (fast to slow):</p>
            <Range min={min} max={max} step={step} value={value} onChange={handleSpeedChange} className={className} />
        </div>
    return ele
}