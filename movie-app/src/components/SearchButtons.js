export default function SearchButtons({CLICKED_OPTIONS, dispatchButton}){
    const returnChangeKey = (key)=>{
        let afterReplace = key.replaceAll("_"," ")
        afterReplace[0].toUpperCase()
        return afterReplace
    }
    return(
        [...Object.entries(CLICKED_OPTIONS)].map((value, index)=>
            value[0]!== "main" &&
            <div className={"col-12 col-md-4 text-center my-2"} key={value[0]}>
                <button className={"btn btn-info"} onClick={()=>{dispatchButton({type: value[1]})}}>
                    {returnChangeKey(value[0])}</button>
            </div>
        )
    )
}