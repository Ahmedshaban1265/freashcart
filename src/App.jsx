import MainSlider from "./Components/MainSlider/MainSlider"
import Navbar from "./Components/Navbar/Navbar"
import CategoriesSlider from "./Components/CategoriesSlider/CategoriesSlider"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Products from "./Components/Products/Products"
import Cart from "./Components/Cart/Cart"
import WishList from "./Components/WishList/WishList"
import Categories from "./Components/Categories/Categories"
import Brands from "./Components/Brands/Brands"
import MainLayout from "./LayOuts/MainLayout/MainLayout"
import Home from "./Components/Home/Home"
import SignIn from "./Components/SignIn/SignIn"
import SignUp from "./Components/SignUp/SignUp"
import AuthLayout from "./LayOuts/AuthLayout/AuthLayout"
import NotFound from "./Components/NotFound/NotFound"
import { Offline, Online } from "react-detect-offline"
import ProtectedRoutes from "./protected routes/ProtectedRoutes"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import CartContextProvider from "./Context/CartContext"
import FavContextProvider from "./Context/FavContext"
import { ToastContainer } from 'react-toastify';
import Footer from "./Components/Footer/Footer"
import Address from "./Components/Address/Address"



export default function App() {
  let routs = createBrowserRouter([{
    path: "/", element: <MainLayout />, children: [
      {index:true ,element:<Navigate to={"/home"}/>},
      { path: 'home', element: <Home /> },
      { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: 'brands', element: <ProtectedRoutes><Brands /> </ProtectedRoutes> },
      { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: 'cart', element: <ProtectedRoutes><Cart /> </ProtectedRoutes> },
      { path: 'WishList', element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      { path: 'product-details/:productId', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: 'address/:id', element: <ProtectedRoutes><Address /></ProtectedRoutes> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: "/", element: <AuthLayout />, children: [
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },

    ]
  }])
  return <>
    <FavContextProvider>
      <CartContextProvider>
        <RouterProvider router={routs} />
      </CartContextProvider>
    </FavContextProvider>

    <Footer/>

    <ToastContainer autoClose={1000 } />
    <Offline>
      <div className="offline">You're Offline Now !</div>
    </Offline>

  </>
}