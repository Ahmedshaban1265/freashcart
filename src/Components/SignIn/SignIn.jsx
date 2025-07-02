import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"

export default function SignIn() {
    let navigate = useNavigate()
    let [error, setError] = useState("")
    let [loading, setLoading] = useState(false)

    function validationSchema() {
        let schema = new yup.object({
            email: yup.string().email("invalid email format").required(),
            password: yup.string().required()
        })
        return schema

    }

    async function sendData(values) {
        setLoading(true)
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            toast.success("Successfully logged in")
            navigate("/home")
            localStorage.setItem("token", data.token)
            localStorage.setItem("userData", JSON.stringify(data.user))
        } catch (error) {
            setError(error.response.data.message)
        }
        setLoading(false)
    }
    let signin = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            sendData(values)
        },
        validationSchema
    })
    return <>
        <div className="my-5 mx-auto w-75">
            <form action="" onSubmit={signin.handleSubmit}>
                <h2>Sign In</h2>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" className="form-control my-3" onChange={signin.handleChange} />
                {signin.errors.email ? <div className="alert alert-danger" role="alert">{signin.errors.email}</div> : null}

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="form-control my-3" onChange={signin.handleChange} />
                {signin.errors.email ? <div className="alert alert-danger" role="alert">{signin.errors.password}</div> : null}
                
                {signin.isValid && signin.dirty ?
                    (loading ? <button disabled type="submit" className="btn btn-success my-3"><span className="spinner-border spinner-border-sm"></span></button>
                    : <button type="submit" className="btn btn-success my-3">Sign In</button>)
                    : <button type = "submit" disabled className = "btn btn-success my-3">Sign In</button>}

                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            </form>
        </div>
    </>
}