export default function FreeTextInput({query,setQuery}){
    return(
        <input className="form-control form-control-sm" type={"text"}
               placeholder="Search here.." minLength={1}
               value={query||""}
               onChange={(event)=>{setQuery(event.target.value)}}
               required/>
    )
}