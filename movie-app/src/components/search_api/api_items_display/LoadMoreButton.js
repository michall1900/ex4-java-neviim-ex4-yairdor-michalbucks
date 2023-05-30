/**
 * This component is handle with the load more button display.
 * @param allData All the data that should be displayed.
 * @param page The current page (Tmdb value)
 * @param maxPage The maximum page that the user could see from the current search
 * @param handleLoadMore A function that handle with pressing on load more.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoadMoreButton({allData, page, maxPage,handleLoadMore}){
    return(
        allData && ( allData.length ?
                (
                    <div className="col-12 my-2 text-center">
                        {(page===maxPage)?"There is no more data":
                            <div className="col-12 my-2 text-center">
                                <button className="btn btn-secondary" onClick={handleLoadMore}>
                                    Load More
                                </button>
                            </div>
                        }
                    </div>
                ):
                (
                    <div className="col-12 my-2 text-center fw-bold fs-2">No results</div>
                )

        )
    )
}