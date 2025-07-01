import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";


export default function CategoriesSlider() {
    let [categories, setCategories] = useState([])

    async function getCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategories(data.data)

    }
    useEffect(() => {
        getCategories()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 1500,
        autoplay: true
    };
    return <>
        <div className="container-fluid px-5 my-5">
            <h2 className="text-secondary mb-5">Featured Categories</h2>
            <Slider {...settings}>
                {categories.map(val =>
                    <>
                    <img src={val.image} className="w-100 px-1" alt="" height={200} />
                    <h5 className="text-center">{val.name} </h5>
                    </>
                )}
            </Slider>
        </div>
    </>
}