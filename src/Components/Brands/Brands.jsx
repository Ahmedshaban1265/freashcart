import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react";
import Loading from"../Loading/Loading"
import Brand from "../Brand/Brand";

export default function Brands() {
    const [isLoading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])

    async function getData() {
        setLoading(true)
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        setBrands(data.data)
        console.log(data.data);
        setLoading(false)
    }
    useEffect(() => {
    getData()
},[])
if (isLoading) {
        return<Loading/>
    }
    return <>
    <div className="container-fluid my-5 px-5">
            <h2 className="text-secondary">All Brands:</h2>
            <div className="container-fluid">
                <div className="row">
                    {brands.map(val =>
                        <Brand key={val._id} val={ val} />
                    )}
                </div>
            </div>
        </div>
    </>
}