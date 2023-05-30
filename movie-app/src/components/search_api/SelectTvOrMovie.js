/**
 * This component is displaying the tv or movie select.
 * @param tvOrMovie - The value of tv/movie.
 * @param setTvOrMovie - A setter to tv/movie
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectTvOrMovie({tvOrMovie, setTvOrMovie}){
    return(
        <select className="form-select"
            value={(tvOrMovie)|| ""}
            onChange = {(event)=>{setTvOrMovie(event.target.value)}}
            name="tvOrMovie"
            required>
            <option value="" disabled>Choose - Series/ Movies</option>
            <option value="Series">Series</option>
            <option value="Movies">Movies</option>
        </select>
    )
}