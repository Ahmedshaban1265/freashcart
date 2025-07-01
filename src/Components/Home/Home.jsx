import MainSlider from "../MainSlider/MainSlider"
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider"
import Products from "../Products/Products"
export default function Home() {
    return <>
        <MainSlider />
        <CategoriesSlider />
        <Products title="popular Products :"/>
    </>
}