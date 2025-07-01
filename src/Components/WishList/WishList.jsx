import { useContext, useEffect, useState } from "react"
import { FavContext } from "../../Context/FavContext"
import axios from "axios";
import { data, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default function WishList() {
    let { favCounter, setFavCounter, deleteFromWishList, getWishListItems } = useContext(FavContext)
    let { addToCart, cartCounter, setCartCounter } = useContext(CartContext)
    let [isLoading, setLoading] = useState(true)
    let [wishList, setWishList] = useState([])


    async function getWishList() {
        setLoading(true)
        try {
            let { data } = await getWishListItems()
            setWishList(data)
            setLoading(false)
            setFavCounter(data.length)

        } catch (error) {
            toast.error(error)
        }
    }
    async function addProduct(productId) {
        try {
            let data = await addToCart(productId)
            if (data.status == "success") {
                toast.success("Product Added Successfully")
                setCartCounter(data.data.products.length)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function deleteItemFromWishList(productId) {
        try {
            let data = await deleteFromWishList(productId)
            toast.success(data.message)
            setFavCounter(data.data.length)
            getWishList()

        } catch (error) {
            toast.error(error)

        }
    }
    useEffect(() => {
        getWishList()
    }, [])
    if (isLoading) {
        return <Loading />
    }
    if (wishList.length == 0) {
        return <div className="container my-5">
            <h2>Wish List:</h2>
            <div className="shadow-sm border border-light rounded-4 p-5 my-4">
                <h1 className="text-center">Your Wish List Is Empty</h1>
                <div className="text-center">
                    <Link to={"/products"} className="btn bg-main text-white w-50">Go To Shopping</Link>
                </div>
            </div>
        </div>
    }
    return <>
        <div className="container my-5">
            <h2>Wish List:</h2>
            {wishList.map(val =>
                <div key={val._id} className="row shadow-sm border border-light rounded-4 p-3 my-4">
                    <div className="col-1">
                        <img src={val.imageCover} className="w-100" alt="" />
                    </div>
                    <div className="col-11 d-flex justify-content-between">
                        <div className="d-flex justify-content-center flex-column">
                            <p className="text-main p-0 m-0">Price : {val.price}EGP</p>
                            <button onClick={() => deleteItemFromWishList(val._id)} className="btn text-danger border-0 p-0 m-0">
                                remove <i className="fa-solid fa-trash p-0 m-0"></i>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center flex-column">
                            <button onClick={() => addProduct(val._id)} className="btn btn-success">Add To Cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}