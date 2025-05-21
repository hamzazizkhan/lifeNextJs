export default function Button({type, text, onClick}){
    return (<button onClick={onClick} className={type}>{text}</button>)
}