export default function Range({min,max,step,value, onChange, className}){
    const ele = <input type="range" className={className} min={min} max={max} step={step} value={value} onChange={onChange} />
    return ele;
}
