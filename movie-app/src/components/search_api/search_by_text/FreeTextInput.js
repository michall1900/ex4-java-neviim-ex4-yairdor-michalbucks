import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

/**
 * This component is handle with free text input - in '/search' of tmdb api.
 * @param inputs - User's inputs from the current form.
 * @param setInputs - A setter to those inputs.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FreeTextInput({inputs,setInputs}){
    const {setHistoryItems} = useHistoryItems()
    /**
     * Change the input and the history item when user changing the input text.
     * @param event
     */
    const handleChange =(event)=>{
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