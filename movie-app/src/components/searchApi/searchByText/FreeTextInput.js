import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

export default function FreeTextInput({inputs,setInputs}){
    const {setHistoryItems} = useHistoryItems()
    const handleChange =(event)=>{
        console.log(encodeURIComponent(event.target.value))
        setInputs((values)=>
            ({...values, [event.target.name]:(event.target.value)})
        )
        setHistoryItems ((prevHistory)=>
            ({...prevHistory, [event.target.name]: (event.target.value)})
        )
    }
    return(
        <div className="row text-center justify-content-center my-2">
            <div className="col -12 col-sm-10 col-lg-6 text-center">
                <input className="form-control form-control-sm text-break" type={"text"}
                       placeholder="Search here.." minLength={1} maxLength={50}
                       value={(inputs.query)?(inputs.query):""}
                       name = "query"
                       onChange={handleChange}
                       required/>
            </div>
        </div>

    )
}