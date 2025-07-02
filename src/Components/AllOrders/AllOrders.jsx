

import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import axios from "axios"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"



export default function AllOrders() {
    let [isLoading, setLoading] = useState(true)
    let [orders, setOrders] = useState([])
    let userData=localStorage.getItem("token")
    let userId=jwtDecode(userData).id


    async function getOrders() {
        setLoading(true)
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            setOrders(data)
        } catch (error) {
            toast.error("something went wrong")

        }
        setLoading(false)


    }
    useEffect(() => {
        getOrders()
    }, [])



    if (isLoading) {
        return <Loading />
    }
    return <>
        <div className="container my-3 p-5 ">
            <h2>All Orders :</h2>
            {orders.map(val =>
                <div key={val._id} className="row shadow-sm border border-light rounded-4 p-3 my-4 d-flex justify-content-between">
                    <div className="col-md-2">
                        {val.cartItems.map(value => <img key={val._id} className="w-100" src={value.product.imageCover} alt="" />)}
                    </div>
                    <div className="col-md-4">
                        <h4 className="border-bottom border-success w-50 ">Order Details</h4>
                        <h6 className="my-2">Payment Method: <span className="text-main">{val.paymentMethodType}</span></h6>
                        <p>Address: <span className="text-main">{val.shippingAddress?.city || "No city info"}</span></p>
                        <p>Phone Number: <span className="text-main">{val.shippingAddress?.phone || "No phone info"}</span></p>
                        <h6 className="">Total Order Price: <span className="text-main">{val.totalOrderPrice} EGP</span></h6>
                    </div>
                </div>)
            }
        </div>
    </>
}
