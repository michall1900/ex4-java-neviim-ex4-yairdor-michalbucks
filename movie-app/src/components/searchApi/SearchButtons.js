export default function SearchButtons({CLICKED_OPTIONS, dispatchButton}){
    const returnChangeKey = (key)=>{
        let afterReplace = key.replaceAll("_"," ")
        return afterReplace.split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');

    }
    return(
        [...Object.entries(CLICKED_OPTIONS)].map((value)=>

            value[0]!== "main" &&
            <div className={"col-12 col-md-4 text-center my-5"} key={value[0]}>
                <button className={"btn btn-info"} onClick={()=>{dispatchButton({type: value[1]})}}>
                    {returnChangeKey(value[0])}</button>
            </div>
        )
    )
}