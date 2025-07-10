import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { CartContext } from "../../Context/CartContext"
import { FavContext } from "../../Context/FavContext"
import { toast } from "react-toastify"


export default function ProductDetails() {
    let { cartCounter, setCartCounter, addToCart } = useContext(CartContext)
    let { favCounter, setFavCounter, addToWishList, getWishListItems } = useContext(FavContext)
    let [isLoading, setLoading] = useState(true)
    let [loved, setLoved] = useState(false)
    let [data, setData] = useState([])
    let { productId } = useParams()

    async function addProduct() {
        setLoading(false)
        let data = await addToCart(productId)
        if (data.status === "success") {
            setCartCounter(data.numOfCartItems)
            toast.success("Product Added Successfully")
            setLoading(true)
        }
    }

    async function addProductTOWishList() {
        setLoved(false)
        let data = await addToWishList(productId)
        if (data.status === "success") {
            setFavCounter(data.data.length)
            console.log(data.data.length);
            setLoved(true)
            toast.success("Product Added Successfully")

        }
    }
    async function getWishList() {
        let data = await getWishListItems();

        if (data?.data?.some(product => product._id === productId)) {
            setLoved(true);
        } else {
            setLoved(false);
        }
    }




    async function getData() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)

        setData(data.data)
    }
    useEffect(() => {
        getData();
        getWishList();
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // autoplaySpeed: 1500,
        // autoplay: true

    };

    return <div className="container">
        <div className="d-flex m-5 mx-5">
            <div className="product-imgs w-25 g-3">
                <Slider {...settings}>
                    {data.images?.map(img =>
                        <img src={img} className="w-100" />
                    )}
                </Slider>
            </div>
            <div className="product-details w-75 d-flex flex-column justify-content-center ps-5">
                <h5>{data.description}</h5>
                <p className="text-light-emphasis">{data.title}</p>

                <div className="d-flex justify-content-between my-3">
                    <h5 className="price">{data.price} EGP</h5>
                    <h6><i className="fa-solid fa-star rating-color"></i> {data.ratingsAverage}</h6>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <button disabled={!isLoading} onClick={addProduct} className="btn bg-main text-white product-btn w-75">+ Add To Cart</button>
                    <a onClick={addProductTOWishList}><i className={`${loved ? "fa-solid" : "fa-regular"} fa-heart love-icon   cursor-pointer`} ></i></a>
                </div>

            </div>
        </div>
    </div>
}