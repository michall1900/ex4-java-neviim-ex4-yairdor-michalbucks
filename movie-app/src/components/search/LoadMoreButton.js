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