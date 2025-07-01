import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import Category from "../Category/Category"

export default function Categories() {
    let [categories, setCategories] = useState([])
    let[isLoading,setLoading]=useState(true)
    async function getData() {
        setLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log(data.data);
        
        setCategories(data.data)
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
            <h2 className="text-secondary">All Categories:</h2>
            <div className="container-fluid">
                <div className="row">
                    {categories.map(val =>
                        <Category key={val._id} val={ val} />
                    )}
                </div>
            </div>
        </div>
    </>
}