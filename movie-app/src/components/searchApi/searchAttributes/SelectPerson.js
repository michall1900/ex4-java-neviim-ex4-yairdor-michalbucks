import React, {useEffect, useState} from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import SelectPersonTitle from "./SelectPersonTitle";
import PersonDropdown from "./PersonDropdown";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

export default function SelectPerson({inputs, setInputs}){

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const {setHistoryItems} = useHistoryItems()

    useEffect(() => {
        const handleClickOutside = (event) => {
            event.stopPropagation();
            const dropdownContainer = document.querySelector(".dropdown");
            if(dropdownContainer){
                const clickedInsideDropdown = dropdownContainer.contains(event.target);
                console.log(clickedInsideDropdown)
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