import React, {useEffect, useState} from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import SelectPersonTitle from "./SelectPersonTitle";
import PersonDropdown from "./PersonDropdown";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

/**
 * This component handle with the selection of a person.
 * @param inputs The inputs for the current form.
 * @param setInputs A setter to those inputs.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectPerson({inputs, setInputs}){

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const {setHistoryItems} = useHistoryItems()

    /**
     * This effect handle with clicking outside the input.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            event.stopPropagation();
            const dropdownContainer = document.querySelector(".dropdown");
            if(dropdownContainer){
                const clickedInsideDropdown = dropdownContainer.contains(event.target);
                const classList = event.target.classList
                if (classList && classList.contains("dropdown-toggle"))
                    setDropdownOpen(true);
                if (!clickedInsideDropdown)
                    setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);

    /**
     * This function is handle with deleting the person choice by deleting it from inputs + history.
     * @param event
     */
    const handleDelete = (event)=>{
        event.stopPropagation();
        setInputs((prevInputs)=>
            ({...prevInputs, "with_cast":null})
        )
        setHistoryItems((prevHistory)=>{
            delete prevHistory["with cast"]
            return prevHistory
        })
        setSearchTerm("")
    }




    return (
        <>
            <SelectPersonTitle inputs={inputs} handleDelete={handleDelete}/>
            <PersonDropdown isDropdownOpen={isDropdownOpen} setDropdownOpen={setDropdownOpen}
                            setInputs={setInputs} setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm}/>
        </>
    );
}