import {useState} from "react";

const MAX_CHARACTERS = 100
export default function LongTextHandler({content}){
    const [isAllText, setIsAllText] = useState(false)
    const partOfContent = content.slice(0, MAX_CHARACTERS)
    return(
        content?
        <>
            <div className="d-none d-lg-block text-break text-start">
                {content}
            </div>
            <div className="d-block d-lg-none text-start">
                {!isAllText? partOfContent + "... " : content + " "}
            </div>
            <div className="d-block d-lg-none text-start my-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={()=>{setIsAllText(!isAllText)}}>
                    {!isAllText? "Show More": "Show Less"}
                </button>
            </div>
        </>:
        "No overview"
    )
}