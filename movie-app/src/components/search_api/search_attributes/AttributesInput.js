import {useCallback, useEffect} from "react";
import Error from "../../Error";
import SelectGenre from "./SelectGenre";
import SelectPerson from "./SelectPerson";
import SearchByPopularity from "./SearchByPopularity";

/**
 * This component is handle with the inputs of the search by attributes.
 * @param inputs - The inputs that are already chosen.
 * @param setInputs - A setter to the inputs to update them.
 * @param tvOrMovie - A string telling if the user chose for tv or movie.
 * @param setIsValid - To set the submit button to disabled if the user is choosing nothing.
 * @param isValid - The is Valid state to add an error message if it is not valid.
 * @returns {JSX.Element}
 * @constructor
 */
export default function AttributesInput({inputs, setInputs, tvOrMovie, setIsValid, isValid}){

    /**
     * This function is checking if the user chose something from the attributes.
     * @type {(function(): void)|*}
     */
    const handleValidation = useCallback(() => {
        if (Array.from(Object.values(inputs)).some((val)=>!!val))
            setIsValid(true);
        else
            setIsValid(false);
    }, [inputs, setIsValid]);

    /**
     * To run the handle validation method in any time that there is a change with the inputs.
     */
    useEffect(() => {
        handleValidation();
    }, [handleValidation]);

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