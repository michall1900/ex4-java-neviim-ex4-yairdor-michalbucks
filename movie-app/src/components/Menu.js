import {Link, Outlet} from "react-router-dom";
import NavbarIcon from "./NavbarIcon";
import CartWithBadge from "./cart_page/CartWithBadge";

/**
 * This component displaying the menu links.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Menu(){

    return(
        <>
            <nav className="navbar navbar-expand bg-light">
                <div className="container-fluid">
                    <NavbarIcon/>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"><CartWithBadge/></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/checkout">Checkout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}