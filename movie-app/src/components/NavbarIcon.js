import logo1 from "../images/logo_ex4.jpg";

export default function NavbarIcon(){
    return(
        <>
            <img src={logo1} alt="logo1" width="50" className="d-inline-block align-text-top"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </>

    )
}