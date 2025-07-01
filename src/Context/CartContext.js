import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0)


async function addToCart(productId) {
    try {
        let { data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
            { headers: { token: localStorage.getItem("token") } })
        return data
    } catch (error) {
        console.log("error");
    }
}

async function getCart() {
    try {
        let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            { headers: { token: localStorage.getItem("token") } })
        return data
    } catch (error) {
        console.log("error");
    }
}

async function deleteItem(productId) {
    try {
        let {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+productId,
            { headers: { token: localStorage.getItem("token") } })
        return data
    } catch (error) {
        console.log("error");
    }
}

async function updateProduct(productId,count) {
    try {
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            { count },
            { headers: { token: localStorage.getItem("token") } })
        return data
    } catch (error) {
        console.log("error");
    }
}

export default function CartContextProvider({ children }) {
    let [cartCounter, setCartCounter] = useState(0);
    return <CartContext.Provider value={{cartCounter,setCartCounter,addToCart,getCart,deleteItem,updateProduct}}>
        {children}
    </CartContext.Provider>
}