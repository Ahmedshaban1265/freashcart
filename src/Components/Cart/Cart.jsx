import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

export default function Cart() {

    let { getCart, deleteItem, setCartCounter, updateProduct } = useContext(CartContext)
    let [cartItem, setCartItem] = useState([])
    let [isLoading, setLoading] = useState(true)

    async function fetchData() {
        setLoading(true)
        let { data } = await getCart()
        console.log(data);
        setCartItem(data)
        setLoading(false)

    }
    async function deleteSpecificItem(id) {
        let data = await deleteItem(id)
        console.log(data);
        if (data.status === "success") {
            toast.error("Product Deleted Successfully")
            setCartItem(data.data)
            setCartCounter(data.numOfCartItems)
        }

    }

    async function deleteCart() {

        try {
            let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem("token") } })
            console.log(data);
            if (data.message === "success") {
                toast.error("Cart Deleted Successfully")
                setCartItem({ products: [], totalCartPrice: 0 })
                setCartCounter(0)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }


    }
    async function updateItem(productId, count) {
        let data = await updateProduct(productId, count);
        console.log(data.data);
        setCartItem(data.data)
        toast.success("Product is Updated Successfully")

    }
    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    if (cartItem.products?.length === 0) {
        return <>
            <div className="shadow-sm border border-light rounded-4 p-3 my-4 mx-5 p-3">
                <div className="d-flex justify-content-between">
                    <div className="left-sec">
                        <h3>Shop Cart :</h3>
                    </div>
                    <div className="right-sec">
                        <button onClick={deleteCart} disabled className="btn btn-danger">Remove <i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <h1 className="text-center ">Your Cart Is Empty</h1>
                <div className="text-center">
                    <Link to={"/products"} className="btn bg-main w-50 my-5 text-white"> Go To Shopping</Link>
                </div>
            </div>
        </>
    }
    return <>


        <div className="container my-3 p-3">
            <div className="d-flex justify-content-between">
                <div className="left-sec">
                    <h3>Shop Cart :</h3>
                    <p className="text-main">Total Cart Price : {cartItem.totalCartPrice} EGP</p>
                </div>
                <div className="right-sec">
                    <Link to={`/address/${cartItem._id}`} className="btn btn bg-main my-3 mx-2 text-white">Place Your Order</Link>
                    <button onClick={deleteCart} className="btn btn-danger">Remove <i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            {cartItem.products.map(val =>
                <div className="row border-bottom shadow-sm border border-light rounded-4 p-3 my-4">
                    <div className="col-1 my-2">
                        <img src={val.product.imageCover} className="w-100 " alt="" />
                    </div>
                    <div className="col-11 d-flex justify-content-between">
                        <div className="details py-3">
                            <p className="p-0 my-1">{val.product.title.split(" ").slice(0, 8).join(" ")}</p>
                            <p className="text-main p-0 my-1">Price :{val.price} EGP</p>
                            <button onClick={() => deleteSpecificItem(val.product._id)} className="text-danger p-0 my-1 btn"> <i class="fa-solid fa-trash"></i>  Delete</button>
                        </div>
                        <div className="counter py-5">
                            <a className="btn btn-outline-success" onClick={() => updateItem(val.product._id, val.count + 1)}>+</a>
                            <span className="px-2">{val.count}</span>
                            {val.count == 1 ? <a className="btn btn-outline-success disabled" onClick={() => updateItem(val.product._id, val.count - 1)}>-</a> : <a className="btn btn-outline-success" onClick={() => updateItem(val.product._id, val.count - 1)}>-</a>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}