export default function Card({title, paragraph, buttons}){
    return (<div className="card">
        <div className="card-body">
            <h2 className="card-header">{title}</h2>
            <p className="text-content2">{paragraph}</p>
                {buttons.map((b)=>{
                   return(<div className="card-footer"> {b} </div>)
                })}
            
        </div>
    </div>)
}
