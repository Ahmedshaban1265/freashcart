import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

export default function SignUp() {
    // function validate(values) {
    //     const error = {}
    //     if (!values.name) {
    //         error.name="The name field is required"
    //     }
    //     if (!values.email) {
    //         error.email="The E-Mail field is required"
    //     }
    //     if (!values.password) {
    //         error.password = "The Password field is required"
    //     }
    //     if (!/^[A-Za-z0-9]{6,}$/.test(values.password)) {
    //         error.password="The password must be at least 6 characters"
    //     }
    //     if (!values.rePassword) {
    //         error.rePassword="The rePassword field is required"
    //     }
    //     if (values.rePassword != values.password) {
    //         error.rePassword="The password dosn't match"
    //     }
    //     if (!values.phone) {
    //         error.phone="The phone field is required"
    //     }
    //     return error
    // }
    let [error, setError] = useState("")
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    async function sendData(values) {
        setLoading(true)
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            navigate("/signin")
            console.log(data);

        } catch (error) {
            console.log(error.response.data.message)
            setError(error.response.data.message)
        }
        setLoading(false)

    }

    function validationSchema() {
        let schema = new yup.object({
            name: yup.string().min(2).max(20).required(),
            email: yup.string().email().required(),
            password: yup.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/, "the password must be at least 6 characters and start with capital letter").required("password is required"),
            rePassword: yup.string().oneOf([yup.ref("password")], "the passwords dosn't match").required(),
            phone: yup.string().required()
        })
        return schema
    }


    let register = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        onSubmit: (values) => {
            console.log(values);
            sendData(values)

        },
        // validate
        validationSchema
    })

    return <>
        <div className="w-75 my-5 mx-auto">
            <form action="" onSubmit={register.handleSubmit}>
                <h2>Register Now:</h2>

                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" className="form-control my-3" onChange={register.handleChange} />
                {register.errors.name ? <div className="alert alert-danger" role="alert">{register.errors.name}</div> : null}

                <label htmlFor="email">E-Mail:</label>
                <input type="email" name="email" id="email" className="form-control my-3" onChange={register.handleChange} />
                {register.errors.email ? <div className="alert alert-danger" role="alert">{register.errors.email}</div> : null}

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="form-control my-3" onChange={register.handleChange} />
                {register.errors.password ? <div className="alert alert-danger" role="alert">{register.errors.password}</div> : null}


                <label htmlFor="rePassword">Re-Password:</label>
                <input type="password" name="rePassword" id="rePassword" className="form-control my-3" onChange={register.handleChange} />
                {register.errors.rePassword ? <div className="alert alert-danger" role="alert">{register.errors.rePassword}</div> : null}


                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone" id="phone" className="form-control my-3" onChange={register.handleChange} />
                {register.errors.phone ? <div className="alert alert-danger" role="alert">{register.errors.phone}</div> : null}


                {register.isValid && register.dirty ?
                    (loading ? <button disabled type="submit" className="btn btn-success my-3">
                        <span className="spinner-border spinner-border-sm"></span></button>
                        : <button type="submit" className="btn btn-success my-3">Register</button>)
                        : <button disabled type="submit" className="btn btn-success my-3">Register</button>}

                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}

            </form>
        </div>
    </>
}