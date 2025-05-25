export default function Button({type, text, onClick}){
    return (
    <div className="my-1">
            <button onClick={onClick} className={type}>{text}</button>
    </div>
    )
}