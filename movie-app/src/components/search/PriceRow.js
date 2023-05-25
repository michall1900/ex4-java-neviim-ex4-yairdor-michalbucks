export default function PriceRow({itemData}){
    const handleBuy = () => {
        console.log("Buy")
        console.log(itemData)
    }
    return(
        <div className="row my-2">
            <div className="col-10 text-bolder text-end">
                Price : 3.99$
            </div>
            <div className="col-2 text-end">
                <button className="btn btn-primary btn-sm" onClick={handleBuy}>Buy</button>
            </div>
        </div>
    )
}