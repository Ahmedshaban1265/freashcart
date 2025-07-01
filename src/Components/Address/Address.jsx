import axios from "axios"
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { data, Navigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default function Address() {
    let { id } = useParams()
    let { setCartCounter } = useContext(CartContext)
    let [isLoading, setLoading] = useState(false)
    let[paymentMethod,setPaymentMethod]=useState("cash")

    async function sendCashData(id, values) {
        setLoading(true)
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
                { shippingAddress: values },
                { headers: { token: localStorage.getItem("token") } })
            setCartCounter(0)
            toast.success("your order placed successfully")
            address.resetForm()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error("something went wrong")
            address.resetForm()
        }
    }
    async function sendVidsData(id, values) {
        setLoading(true)
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
                { shippingAddress: values },
                { headers: { token: localStorage.getItem("token") } })
            setCartCounter(0)
            toast.success("your order placed successfully")
            address.resetForm()
            setLoading(false)
            if (data.status == "success") {
                window.location.href = data.session.url
            }
        } catch (error) {
            setLoading(false)
            toast.error("something went wrong")
            address.resetForm()
        }
    }
    let address = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: (values) => {
            if (paymentMethod === "cash") {
                sendCashData(id, values)
            }
            else {
                sendVidsData(id, values)
            }
        }
    })


    return <>
        <form className="container my-5 shadow-sm border border-light rounded-4 p-3" onSubmit={address.handleSubmit} onReset={address.handleReset}>
            <label htmlFor="details">Details :</label>
            <textarea name="details" id="details" className="form-control my-3" onChange={address.handleChange} value={address.values.details}></textarea>

            <label htmlFor="phone">Phone :</label>
            <input type="text" name="phone" id="phone" className="form-control my-3" onChange={address.handleChange} value={address.values.phone} />

            <label htmlFor="city">City :</label>
            <input type="text" name="city" id="city" className="form-control my-3" onChange={address.handleChange} value={address.values.city} />

            <div className="my-3">
                <input type="radio" id="online" name="paymentMethod" className="me-2 text-main" checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)} value={"online"}/>
                <label htmlFor="online" className=" text-main">Online Payment</label><br />
                <input type="radio" id="cash" name="paymentMethod" className="me-2 text-main"  checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)} value={"cash"}/>
                <label htmlFor="cash" className="text-main">Cash Payment</label>
            </div>


            {isLoading ? <button disabled className="btn bg-main text-white w-25 mb-3">place order</button> : <button className="btn bg-main text-white w-25 mb-3">place order</button>}
        </form>


    </>
}