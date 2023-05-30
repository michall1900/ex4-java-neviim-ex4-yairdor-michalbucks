import {useState} from "react";

const MAX_CHARACTERS = 100

/**
 * This component is handle with long text display. It makes sure that Load more button will appear when the screen is
 * small for the current text.
 * @param content The content that should be displayed
 * @returns {JSX.Element|string}
 * @constructor
 */
export default function LongTextHandler({content}){
    const [isAllText, setIsAllText] = useState(false)
    const partOfContent = !!content? content.slice(0, MAX_CHARACTERS): ""
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