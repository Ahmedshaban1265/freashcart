import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"

export default function ProtectedRoutes({children}) {
    let token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to={"/signin"}/>
    }
    try {
        let decoded = jwtDecode(token)
        return children
    } catch (error) {
        localStorage.removeItem("token")
        return <Navigate to={"/signin"} />
    }

}