import notfound from"../../assets/images/error.svg"

export default function NotFound() {
    return <>
        <div className="d-flex justify-content-center align-items-center my-5">
            <img src={notfound} className="w-50" alt=""  />
    </div>
    </>
}