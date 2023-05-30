import {useState} from "react";
import SelectTvOrMovie from "./SelectTvOrMovie";
import FreeTextInput from "./search_by_text/FreeTextInput";
import AttributesInput from "./search_attributes/AttributesInput";

export default function SearchForm({inputs, setInputs, tvOrMovie, setTvOrMovie,handleSubmit,isByText}){
    const [isValid, setIsValid] = useState("true")
    return(
        <form className="form" onSubmit={handleSubmit} >
            <div className="row text-center justify-content-center my-2">
                <div className="col-12 col-sm-5 col-xl-3 my-2">
                    <SelectTvOrMovie tvOrMovie={tvOrMovie} setTvOrMovie={setTvOrMovie}/>
                </div>
                <div className="col-12 my-2">
                    {isByText? <FreeTextInput inputs={inputs} setInputs={setInputs}/> :
                        <AttributesInput inputs={inputs} setInputs={setInputs} tvOrMovie={tvOrMovie} setIsValid ={setIsValid}
                        isValid={isValid}/>}
                </div>
                <div className="col-12 text-center my-2">
                    <button type="submit" className="btn btn-secondary" disabled={!isValid}>Search</button>
                </div>
            </div>
        </form>
    )
}