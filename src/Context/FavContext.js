import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export let FavContext = createContext(0)
async function addToWishList(productId) {
    try {
        let { data } =await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
            headers: {
            token:localStorage.getItem("token")
        }}
        )
        
        return data
    } catch (error) {
        toast.error(error)
        
    }

}
async function deleteFromWishList(productId) {
    try {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
        {
            headers: {
            token:localStorage.getItem("token")
            }
        }
    )
    
    return data;
    } catch (error) {
        toast.error(error)
        
    }
}

async function getWishListItems() {
        try {
            let {data}  = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
                { headers: { token: localStorage.getItem("token") } })
            return data;
        } catch (error) {
            toast.error(error)

        }
    }



export default function FavContextProvider({ children }) {
    const [favCounter, setFavCounter] = useState(0)
    return <FavContext.Provider value={{
        favCounter,
        setFavCounter,
        addToWishList,
        deleteFromWishList,
        getWishListItems
    }}>
        {children}
    </FavContext.Provider>
}