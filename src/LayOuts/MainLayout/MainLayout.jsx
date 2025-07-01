import { Outlet } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";


export default function UserLayout() {
    return <>
        <Navbar />
        <Outlet />
    </>
}