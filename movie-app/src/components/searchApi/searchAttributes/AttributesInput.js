import {useEffect} from "react";
import Error from "../../Error";
import SelectGenre from "./SelectGenre";
import SelectPerson from "./SelectPerson";
import SearchByPopularity from "./SearchByPopularity";

export default function AttributesInput({inputs, setInputs, tvOrMovie, setIsValid, isValid}){

    useEffect(()=>{
        if (inputs.with_genres || inputs.with_cast || inputs.sort_by)
            setIsValid(true)
        else
            setIsValid(false)

    },[inputs])


    return(

        <div className="row my-2">
            {!!tvOrMovie &&
                <>
                    <div className="col-12 col-md-6 my-2">
                        <SelectGenre setInputs={setInputs} tvOrMovie={tvOrMovie} setIsValid={setIsValid}/>
                    </div>
                    <div className="col-12 col-md-6 my-2">
                        <SelectPerson inputs={inputs} setInputs={setInputs} setIsValid={setIsValid}/>
                    </div>
                    <div className="col my-2 align-self-center">
                        <SearchByPopularity setInputs={setInputs}/>
                    </div>
                    {!isValid &&
                        (<div className="col-12 my-2">
                            <Error error={"You must to choose at list one of the options"}/>
                        </div>)}
                </>
            }

        </div>
    )
}