export default function Dropdown({buttonName, dropdownValues,setFilterValue  }){

    function handleValueClick(e){
        console.log("in dropdown, filter button clicked value:");
        console.log(e.target.innerText);
        setFilterValue(e.target.innerText);
    }
return(

        <div className="dropdown">
            <label className="btn btn-solid-primary mx-2" tabIndex="0">{buttonName}</label>
            <div className="dropdown-menu dropdown-menu-right">
                {dropdownValues.map((val)=>
                    <button className="dropdown-item text-sm" onClick={(e)=>handleValueClick(e)} key={val}>{val}</button>
                )}
            </div>
        </div>
)

}
