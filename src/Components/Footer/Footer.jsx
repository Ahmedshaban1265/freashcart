import amazon from "../../assets/images/amazonpay-DDt8kHan.svg"
import amrican from "../../assets/images/american-express-F7V82bnT.svg"
import master from "../../assets/images/mastercard-CokDZD99.svg"
import paypal from "../../assets/images/paypal.svg"
import visa from "../../assets/images/visa.svg"
import apple from "../../assets/images/appstore-btn-TmL4qmIb.svg"
import google from "../../assets/images/googleplay-btn-CwMI-V7g.svg"

export default function Footer() {
    return <>
        <div className="container-fluid p-5 bg-main-light" >
            <h4 className="">Get The FreshCart App</h4>
            <p>We will send you a link, open it on your phone to download the app.</p>
            <form action="" className="d-flex justify-content-between my-4">
                <input type="text" name="" id="" placeholder="E-Mail" className="form-control w-75" />
                <button className="btn bg-main text-white ">share app link</button>
            </form>
            <div className="border-top border-bottom py-4 d-flex justify-content-between align-items-center gap-5 flex-wrap text-center">
                <div className="d-flex align-items-center flex-wrap gap-2">
                    <h6 className="m-0">Payment Partners</h6>
                    <img src={amazon} alt="" />
                    <img src={amrican} alt="" />
                    <img src={master} alt="" />
                    <img src={paypal} alt="" />
                    <img src={visa} alt="" />
                </div>
                <div className="d-flex align-items-center flex-wrap gap-2">
                    <h6 className="m-0">Get deliveries with FreshCart</h6>
                    <img src={google} alt="" />
                    <img src={apple} alt="" />
                </div>
            </div>

        </div>
    </>
}