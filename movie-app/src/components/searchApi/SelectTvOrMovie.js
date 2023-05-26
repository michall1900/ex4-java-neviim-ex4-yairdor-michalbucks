export default function SelectTvOrMovie({tvOrMovie, setTvOrMovie}){
    return(
        <select className="form-select"
            value={(tvOrMovie)|| ""}
            onChange = {(event)=>{setTvOrMovie(event.target.value)}}
            required>
            <option value="" disabled>Choose - Series/ Movies</option>
            <option value="Series">Series</option>
            <option value="Movies">Movies</option>
        </select>
    )
}