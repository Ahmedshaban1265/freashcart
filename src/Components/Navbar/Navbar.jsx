import { Navigate, NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect, useState } from "react"
import { FavContext } from "../../Context/FavContext"
import { CartContext } from "../../Context/CartContext"
import { toast } from "react-toastify"

export default function Navbar() {
    let { cartCounter, getCart, setCartCounter } = useContext(CartContext)
    let { favCounter, setFavCounter, getWishListItems } = useContext(FavContext)
    let [user, setUser] = useState(!!localStorage.getItem("token"))
    const navigate = useNavigate()

    // async function fetchData() {
    //     let data  = await getCart()
    //     console.log(data);
    //     setCartCounter(data.numOfCartItems)

    // }
    // useEffect(() => {
    //     fetchData()
    // }, [])
    
    function signOut() {

        localStorage.removeItem("token")
        setCartCounter(0)
        setFavCounter(0)
        navigate("/signin")
        toast.success("You signed out")
    }
    async function fetchData() {
        try {
            if (!localStorage.getItem("token")) return;
        let data = await getCart()
        setCartCounter(data.numOfCartItems)
        let response = await getWishListItems()
        setFavCounter(response.data.length);
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return <>

        <nav className="navbar navbar-expand-lg bg-main-light sticky-top">
            <div className="container-fluid  px-5 py-1">
                <NavLink className="navbar-brand" to="/home"><img className="w-100" src={logo} alt="" /></NavLink>
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
                            {user?<NavLink className="nav-link position-relative d-flex  align-items-center" to="/Cart">Cart
                                <i className="fa-solid fa-cart-shopping ms-1"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCounter}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </NavLink>:null}
                        </li>
                        <li className="nav-item">
                            {user?<NavLink className="nav-link position-relative  d-flex  align-items-center" to="/WishList">WishList
                                <i className="fa-solid fa-heart ms-1"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {favCounter}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </NavLink>:null}
                        </li>
                        <li className="nav-item">
                            {user?<span className="nav-link btn d-flex  align-items-center" onClick={signOut}>SignOut
                            </span>:null}
                        </li>
                        <li className="nav-item">
                            {!user?<NavLink className="nav-link btn" to={"/signin"}>Sign In
                            </NavLink>:null}
                        </li>
                        <li className="nav-item">
                            {!user?<NavLink className="nav-link btn" to={"/signup"}>Sign Up
                            </NavLink>:null}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
}