export default function SaveSettingsButton({setsize,sizeChange, setspeed,speedChangeInput, setnumiterChange, iterChangeInput}){
    function saveSettings(){
        
        setsize(sizeChange);
        setnumiterChange(iterChangeInput);
        setspeed(speedChangeInput);    
    }

    return(
    <button className="btn btn-primary" onClick={saveSettings}>Save</button>
    )
}