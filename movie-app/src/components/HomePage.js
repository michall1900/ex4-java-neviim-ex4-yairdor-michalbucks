import {useCartCounterProvider} from "../contexts/CounterContext";
import {useEffect} from "react";

/**
 * This component is handle with the display of the home page.
 * @returns {JSX.Element}
 * @constructor
 */
export default function HomePage(){
    const {setFetchAgain} = useCartCounterProvider()
    useEffect(()=>{
        setFetchAgain(true);
    },[setFetchAgain])
    const titleStyle = {
        fontFamily: 'Great Vibes, cursive',
        fontSize: '5rem',
        color: '#ff69b4',
        textShadow: '2px 2px 0 #fff, 4px 4px 0 #f7d5d5, 6px 6px 0 #ff69b4',
    };
    return(
        <div className="container">
            <h1 className="text-center fw-bolder fst-italic my-2">
                Movies and Series Shop - TMDB
            </h1>
            <div className="row my-2 text-center">
                <div className="col-12 text-center fst-italic my-2">
                    Created by Yair Dor and Michal Bucks
                </div>
                <div className="col-12 text-center fs-5 fw-bold my-2">
                    Hello and welcome to our website
                </div>
                <div className="col-12 fs-5 fw-bold my-2">
                    In this website you can search for a movie/ series by its name or by some attributes and buy them later.
                </div>
                <div className="col-12 text-center my-2">
                    <h1 className="display-1 text-center text-secondary fw-bold" style={titleStyle}>Enjoy</h1>
                </div>
            </div>
        </div>
    )
}