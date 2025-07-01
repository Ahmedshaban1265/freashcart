import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";

export default function Products({ title = "All Products :" }) {
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    async function getProducts() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        setProducts(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getProducts()
    }, [])
    
    if (isLoading) {
        return <Loading/>
    }
    return <>
        <div className="container-fluid my-5 px-5">
            <h2 className="text-secondary">{ title}</h2>
            <div className="container-fluid">
                <div className="row">
                    {products.map(val =>
                        <Product key={val._id} val={ val} />
                    )}
                </div>
            </div>
        </div>

    </>
}