import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"

export default function MainSlider() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 1500,
        autoplay:true

    };
    return (
        <div className="m-5 d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9">
                <Slider {...settings}>
                    <img src={slide1} alt="" className="w-100" height={450} />
                    <img src={slide2} alt="" className="w-100" height={450} />
                    <img src={slide3} alt="" className="w-100" height={450} />
                </Slider>
            </div>
            <div className={`col-md-3 d-none d-md-block`}>
                <img src={slide1} className="w-100" height={225} alt="" />
                <img src={slide3} className="w-100" height={225} alt="" />
            </div>
        </div>
    );

}