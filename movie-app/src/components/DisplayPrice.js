import globalConstantsModule from "../utilities/globalConstantsModule";

/**
 * This component is displaying the price.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DisplayPrice(){
    return (
        <div className="col-8 text-bolder text-end">
            Price : {globalConstantsModule.ITEM_PRICE}$
        </div>
    )
}