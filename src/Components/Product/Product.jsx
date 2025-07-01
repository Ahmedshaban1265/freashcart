import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { FavContext } from "../../Context/FavContext";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "../Loading/Loading";
import axios from "axios";

export default function Product(props) {
    let { cartCounter, setCartCounter, addToCart } = useContext(CartContext)
    let { favCounter, setFavCounter, addToWishList,deleteFromWishList } = useContext(FavContext)
    let [isLoading, setLoading] = useState(true)
    let[loved,setLoved]=useState(false)
    // async function addProduct() {
    //     setLoading(false)
    //     let { data } = await addToCart(props.val._id)
    //     console.log(data.message);

    //     if (data.status === "success") {
    //         toast.success("Product Added Successfully");
    //         setCartCounter(data.numOfCartItems+1)
    //         setLoading(true)
    //     }
    // }

    async function addProduct() {
        setLoading(false)
        let data = await addToCart(props.val._id)

        if (data.status === "success") {
            console.log(data.message);
            setCartCounter(data.numOfCartItems)
            toast.success("Product Added Successfully")
            setLoading(true)
        }



    }

    async function addProductToFav() {
        try {
            let data = await addToWishList(props.val._id)
            console.log(data.message);
            toast.success(data.message)
            setFavCounter(data.data.length)
            setLoved(true)
        } catch (error) {

        }

    }
    async function deleteItemFromWishList() {
        try {
            let data = await deleteFromWishList(props.val._id)
            console.log(data);
            toast.success(data.message)
            setFavCounter(data.data.length)
            setLoved(false)
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return <>

        <div className="col-3 g-5">
            <div className=" product shadow-sm border border-light rounded-4 p-3 cursor-pointer h-100"  >
                <Link to={"/product-details/" + props.val._id}>
                    <img src={props.val.imageCover} className="w-100" alt="..." />
                    <div className="py-2">
                        <h5 className=" text-main">{props.val.category.name}</h5>
                        <h3 className="card-text">{props.val.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <div className="d-flex justify-content-between ">
                            <h6 className="price">{props.val.price} EGP</h6>
                            <h6 className=""><i className="fa-solid fa-star rating-color"></i> {props.val.ratingsAverage}</h6>
                        </div>
                    </div>
                </Link>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={addProduct} className="btn bg-main text-white product-btn w-75 d-flex justify-content-center align-items-center" style={{ height: "40px" }}>
                        {!isLoading ?
                            (<div className="spinner-border p-0 m-0 loading" role="status" style={{ width: "1.5rem", height: "1.5rem" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            ) : (
                                <span>Add to cart</span>
                            )}
                    </button>

                    {loved?<span onClick={deleteItemFromWishList}><i className="fa-solid fa-heart love-icon" ></i></span>:<span onClick={addProductToFav} ><i className="fa-regular fa-heart love-icon" ></i></span>}
                </div>
            </div>
        </div>
    </>
}