import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg"

export default function AuthLayout() {
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid px-5 py-1">
                <NavLink className="navbar-brand" to="/"><img className="w-100" src={logo} alt="" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/brands">Brands</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Categories">Categories</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin">Sign In
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <Outlet/>
    </>
}