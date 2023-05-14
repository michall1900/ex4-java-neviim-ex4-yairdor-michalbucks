
/**
 * Holds the globals that in use in the whole program.
 * @type {{GUESS_ARRAY_LENGTH: number, MAX_DIGIT_EXCLUDED: number, MAX_LETTERS_IN_NAME: number, MAX_HIGH_SCORE_LIST_LENGTH: number, URL: string, MIN_LETTERS_IN_NAME: number}}
 */
const globalConstantsModule = (function(){
    const FETCH_INIT = "FETCH_INIT"
    const FETCH_SUCCESS = "FETCH_SUCCESS"
    const FETCH_FAILURE = "FETCH_FAILURE"
    const API_KEY = "a2392eb648abf6ef6103ccd1bf56b8e9"
    const SEARCH_BY_NAME = "/search"
    const SEARCH_SERIES = "/series"
    const SEARCH_MOVIE = "/movie"
    const API_URL_PREFIX  = "https://api.themoviedb.org/3"
    const GET_IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/original"


    return {
        FETCH_INIT, FETCH_SUCCESS,FETCH_FAILURE, API_KEY,SEARCH_BY_NAME, SEARCH_SERIES, SEARCH_MOVIE, API_URL_PREFIX,
        GET_IMAGE_URL_PREFIX
    }
})();
export default globalConstantsModule;