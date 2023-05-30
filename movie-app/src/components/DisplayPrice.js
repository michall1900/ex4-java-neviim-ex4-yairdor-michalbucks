import globalConstantsModule from "../utilities/globalConstantsModule";

export default function DisplayPrice(){
    return (
        <div className="col-8 text-bolder text-end">
            Price : {globalConstantsModule.ITEM_PRICE}$
        </div>
    )
}